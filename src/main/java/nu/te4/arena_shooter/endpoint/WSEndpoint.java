package nu.te4.arena_shooter.endpoint;

import java.util.*;
import java.util.List;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import nu.te4.arena_shooter.GameHandler;
import nu.te4.arena_shooter.entities.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static nu.te4.arena_shooter.JsonMessenger.getJsonMessenger;

/**
 * @author erikh
 */
@ServerEndpoint("/endpoint")
public class WSEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(WSEndpoint.class);
    static Map<Integer, GameHandler> GAMES = new HashMap<>();
    static Set<Session> SESSIONS = new HashSet<>();

    @OnMessage
    public void onMessage(String message, Session user) {
        String msgType = message.substring(0, message.indexOf(':'));
        message = message.substring(message.indexOf(':') + 1);

        try {//TODO bryt upp i funktioner om det går
            if (user.getUserProperties().get("username") == null && msgType.equals("name")) {
                user.getUserProperties().put("username", message);
                user.getUserProperties().put("lobby", "0");
                broadcastMessege(getJsonMessenger().updateUsersMessage(SESSIONS));

            } else if (msgType.equals("join")) {
                LOGGER.info("Join command initiated by " + user.getUserProperties().get("username"));
                user.getUserProperties().put("lobby", message);
                broadcastMessege(getJsonMessenger().updateUsersMessage(SESSIONS));

            } else {
                int lobby = Integer.parseInt((String) user.getUserProperties().get("lobby"));
                int playerNr = Integer.parseInt((String) user.getUserProperties().get("playerNr"));

                switch (msgType) {
                    case "start":
                        LOGGER.info("Start command initiated by " + user.getUserProperties().get("username"));
                        GAMES.put(lobby, creatGame(lobby));
                        break;
                    case "move":
                        LOGGER.info("Move command initiated by " + user.getUserProperties().get("username"));
                        int dirX = Integer.parseInt(message.substring(0, message.indexOf(":")));
                        int dirY = Integer.parseInt(message.substring(message.indexOf(":") + 1));
                        GAMES.get(lobby).move(playerNr, dirX, dirY);
                        break;
                    case "attack":
                        break;
                }
                getJsonMessenger().gameStateMessage(SESSIONS, GAMES.get(lobby).getGame());
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.onMessage" + e.getMessage());
        }
    }

    @OnOpen
    public void open(Session user) {
        LOGGER.debug("New Session created");
        int playerNr = 0;
        int heighestNr = 0;
        for(Session session:SESSIONS){
            int currentPlayerNr = Integer.parseInt((String)session.getUserProperties().get("playerNr"));
            if(currentPlayerNr > heighestNr){
                heighestNr = currentPlayerNr;
            }
        }
        playerNr = heighestNr+1;
        SESSIONS.add(user);
        user.getUserProperties().put("playerNr", Integer.toString(playerNr));
        try {
            user.getBasicRemote().sendText(getJsonMessenger().newUserMessage());
            user.getBasicRemote().sendText(getJsonMessenger().lobbyMessage());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    @OnClose
    public void close(Session user) {
        SESSIONS.remove(user);
    }

    /**
     *
     * @param msg
     */
    public void broadcastMessege(String msg) {
        try {
            for (Session session : SESSIONS) {
                session.getBasicRemote().sendText(msg);
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.broadcastMessage: " + e.getMessage());
        }

    }

    /**
     *
     * @param lobby
     * @return
     */
    public GameHandler creatGame(int lobby) {
        Random r = new Random();
        List<Player> players = new ArrayList<>();
        for (Session session : SESSIONS) {
            int playerNr = Integer.parseInt((String) session.getUserProperties().get("playerNr"));
            if ((session.getUserProperties().get("lobby")).equals(Integer.toString(lobby))) {
                players.add(new PlayerFactory().getStandardPlayer(playerNr, new PlayerColor(r.nextInt(255), r.nextInt(255), r.nextInt(255))));
                LOGGER.info("Player added to list!");
            }
        }
        return new GameHandler(new GameBuilder()
                .Grid(new GridFactory().getGrid(16, 16, .2f, 5))
                .Players(players)
                .build());
    }

}
