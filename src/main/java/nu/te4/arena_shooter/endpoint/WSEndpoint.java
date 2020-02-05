package nu.te4.arena_shooter.endpoint;

import java.util.*;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import nu.te4.arena_shooter.GameHandler;
import nu.te4.arena_shooter.SessionHandler;
import nu.te4.arena_shooter.entities.*;
import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.entities.player.PlayerColor;
import nu.te4.arena_shooter.entities.player.PlayerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static nu.te4.arena_shooter.JsonMessenger.getJsonMessenger;

/**
 * @author erikh
 */
@ServerEndpoint("/endpoint")
public class WSEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(WSEndpoint.class);
    private static final Map<Integer, GameHandler> GAMES = new HashMap<>();
    private static final Map<Integer, ScheduledExecutorService> SCHEDULED_GAME_UPDATES = new HashMap<>();

    /**
     *
     * @param message
     * @param user
     */
    @OnMessage
    public void onMessage(String message, Session user) {
        String msgType = message.substring(0, message.indexOf(':'));
        message = message.substring(message.indexOf(':') + 1);

        try {
            if (user.getUserProperties().get("username") == null && msgType.equals("name")) {
                user.getUserProperties().put("username", message);
                user.getUserProperties().put("lobby", "0");
                broadcastMessege(getJsonMessenger().updateUsersMessage());

            } else if (msgType.equals("join")) {
                LOGGER.info("Join command initiated by " + user.getUserProperties().get("username"));
                boolean inGame = false;
                for(GameHandler gameHandler : GAMES.values()){
                    for(Player player : gameHandler.getGame().getPlayers()){
                        if(player.getPlayerNr() == Integer.parseInt((String)user.getUserProperties().get("playerNr"))){
                            inGame = true;
                        }
                    }
                }
                if(!inGame){
                    user.getUserProperties().put("lobby", message);
                    broadcastMessege(getJsonMessenger().updateUsersMessage());
                }
            } else {
                int lobby = Integer.parseInt((String) user.getUserProperties().get("lobby"));

                if (msgType.equals("start")) {
                    LOGGER.info("Start command initiated by " + user.getUserProperties().get("username"));
                    if(!GAMES.containsKey(lobby)){
                        GAMES.put(lobby, creatGame(lobby));
                        getJsonMessenger().fullGameInfo(GAMES.get(lobby).getGame());
                    }
                } else {
                    if (!message.equals("")) {
                        int playerNr = Integer.parseInt((String) user.getUserProperties().get("playerNr"));
                        int dirX = Integer.parseInt(message.substring(0, message.indexOf(",")));
                        int dirY = Integer.parseInt(message.substring(message.indexOf(",") + 1));
                        if (msgType.equals("move")) {
                            GAMES.get(lobby).playerMove(playerNr, dirX, dirY);
                        } else if (msgType.equals("attack")) {
                            GAMES.get(lobby).playerAttack(playerNr, dirX, dirY);
                        }
                        getJsonMessenger().gameStateMessage(GAMES.get(lobby).getGame());
                    }

                }
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.onMessage" + e.getMessage());
        }
    }

    /**
     *
     * @param user
     */
    @OnOpen
    public void open(Session user) {
        LOGGER.debug("New Session created");
        int playerNr = 0;
        int highestNr = 0;
        for (Session session : SessionHandler.SESSIONS) {
            int currentPlayerNr = Integer.parseInt((String) session.getUserProperties().get("playerNr"));
            if (currentPlayerNr > highestNr) {
                highestNr = currentPlayerNr;
            }
        }
        playerNr = highestNr + 1;
        SessionHandler.SESSIONS.add(user);
        user.getUserProperties().put("playerNr", Integer.toString(playerNr));
        try {
            user.getBasicRemote().sendText(getJsonMessenger().newUserMessage());
            user.getBasicRemote().sendText(getJsonMessenger().lobbyMessage());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    /**
     *
     * @param user
     */
    @OnClose
    public void close(Session user) {
        if(GAMES.containsKey(Integer.parseInt((String)user.getUserProperties().get("lobby")))){
            GAMES.get(Integer.parseInt((String)user.getUserProperties().get("lobby")))
                    .removeDisconnectedPlayer(Integer.parseInt((String)user.getUserProperties().get("playerNr")));
        }
        SessionHandler.SESSIONS.remove(user);
    }

    /**
     * @param msg
     */
    public void broadcastMessege(String msg) {
        try {
            for (Session session : SessionHandler.SESSIONS) {
                session.getBasicRemote().sendText(msg);
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.broadcastMessage: " + e.getMessage());
        }

    }

    /**
     *
     * @param lobby
     */
    public void destroyGame(int lobby) {
        SCHEDULED_GAME_UPDATES.get(lobby).shutdownNow();
        GAMES.remove(lobby);
    }

    /**
     * @param lobby
     * @return
     */
    public GameHandler creatGame(int lobby) {
        Random r = new Random();
        List<Player> players = new ArrayList<>();
        for (Session session : SessionHandler.SESSIONS) {
            int playerNr = Integer.parseInt((String) session.getUserProperties().get("playerNr"));
            if ((session.getUserProperties().get("lobby")).equals(Integer.toString(lobby))) {
                players.add(new PlayerFactory().getStandardPlayer(playerNr, new PlayerColor(r.nextInt(255), r.nextInt(255), r.nextInt(255))));
            }
        }

        GameHandler gameHandler = new GameHandler(new GameBuilder()
                .Grid(new GridFactory().getGrid(16, 16, .2f, 5))
                .Players(players)
                .build());
        gameHandler.randomizePlayerPos();

        //Adds scheduler to run update() every second and send current game state after update
        Thread update = new Thread(() -> {
            if(gameHandler.getGame().isFinished()){
                destroyGame(lobby);
            }
            gameHandler.update();
            getJsonMessenger().gameStateMessage(GAMES.get(lobby).getGame());
        });
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(update, 0, 50, TimeUnit.MILLISECONDS);
        SCHEDULED_GAME_UPDATES.put(lobby, executor);

        return gameHandler;
    }
}