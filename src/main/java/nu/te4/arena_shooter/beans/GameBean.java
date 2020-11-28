package nu.te4.arena_shooter.beans;


import nu.te4.arena_shooter.GameHandler;
import nu.te4.arena_shooter.SessionHandler;
import nu.te4.arena_shooter.entities.Game;
import nu.te4.arena_shooter.entities.GameBuilder;
import nu.te4.arena_shooter.entities.GridFactory;
import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.entities.player.PlayerColor;
import nu.te4.arena_shooter.entities.player.PlayerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.Session;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import static nu.te4.arena_shooter.JsonMessenger.getJsonMessenger;

public class GameBean {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameBean.class);
    private static final Map<Integer, GameHandler> GAMES = new HashMap<>();
    private static final Map<Integer, ScheduledExecutorService> SCHEDULED_GAME_UPDATES = new HashMap<>();

    /**
     * Sets a user lobby property. Does not work if player already is in a lobby with a game started.
     *
     * @param user  User
     * @param lobby Lobby to join
     * @return If successfully changed lobby returns Json String of users new state else returns empty string if failed to join lobby
     */
    public String joinGameLobby(Session user, String lobby) {
        boolean inGame = false;
        for (GameHandler gameHandler : GAMES.values()) {
            for (Player player : gameHandler.getGame().getPlayers()) {
                if (player.getPlayerNr() == Integer.parseInt((String) user.getUserProperties().get("playerNr"))) {
                    inGame = true;
                }
            }
        }
        if (!inGame) {
            user.getUserProperties().put("lobby", lobby);
            //TODO check if needed
            //----
            if(GAMES.containsKey(lobby)) {
                getJsonMessenger().fullGameInfo(GAMES.get(lobby).getGame());
            }
            //----
            return getJsonMessenger().updateUsersMessage();
        }
        return "";
    }

    /**
     * Starts a game for that lobby
     *
     * @param lobby Lobby to start game for
     */
    public void startGame(int lobby) {
        if (!GAMES.containsKey(lobby)) {
            GAMES.put(lobby, creatGame(lobby));
            getJsonMessenger().fullGameInfo(GAMES.get(lobby).getGame());
        }
    }

    /**
     * Moves a player in a game
     *
     * @param playerNr Players number
     * @param dirX     Direction to move in: 1 = Left, -1 = Right, 0 = No direction
     * @param dirY     Direction to move in: 1 = Down, -1 = Up, 0 = No direction
     * @param lobby    Lobby that the player is in
     */
    public void moveAction(int playerNr, int dirX, int dirY, int lobby) {
        GAMES.get(lobby).playerMove(playerNr, dirX, dirY);
    }

    /**
     * Issues an attack from a player in a game
     *
     * @param playerNr Players number
     * @param dirX     Direction of attack: 1 = Left, -1 = Right, 0 = No direction
     * @param dirY     Direction of attack: 1 = Down, -1 = Up, 0 = No direction
     * @param lobby    Lobby that the player is in
     */
    public void attackAction(int playerNr, int dirX, int dirY, int lobby) {
        GAMES.get(lobby).playerAttack(playerNr, dirX, dirY);
    }

    /**
     * Get a game from a lobby
     *
     * @param lobby Lobby that contains game
     * @return Returns a Game object
     */
    public Game getGame(int lobby) {
        return GAMES.get(lobby).getGame();
    }

    /**
     * Removes a user from GAMES
     *
     * @param user User to remove
     */
    public void removePlayer(Session user) {
        if (GAMES.containsKey(Integer.parseInt((String) user.getUserProperties().get("lobby")))) {
            GAMES.get(Integer.parseInt((String) user.getUserProperties().get("lobby")))
                    .removeDisconnectedPlayer(Integer.parseInt((String) user.getUserProperties().get("playerNr")));
        }
    }

    /**
     * Destroys a game and removes its scheduler.
     *
     * @param lobby Lobby that contains game
     */
    public void destroyGame(int lobby) {
        SCHEDULED_GAME_UPDATES.get(lobby).shutdownNow();
        GAMES.remove(lobby);
    }

    /**
     * Creates a new game, gameHandler and starts a update scheduler for that gameHandler.
     *
     * @param lobby Lobby to create game for
     * @return Returns a new gameHandler for specified lobby
     */
    public GameHandler creatGame(int lobby) {
        Random r = new Random();
        List<Player> players = new ArrayList<>();
        for (Session session : SessionHandler.SESSIONS) {
            int playerNr = Integer.parseInt((String) session.getUserProperties().get("playerNr"));
            String playerName = (String)session.getUserProperties().get("username");
            if ((session.getUserProperties().get("lobby")).equals(Integer.toString(lobby))) {
                players.add(new PlayerFactory().getStandardPlayer(playerNr, new PlayerColor(r.nextInt(255), r.nextInt(255), r.nextInt(255)), playerName));
            }
        }

        GameHandler gameHandler = new GameHandler(new GameBuilder()
                .Grid(new GridFactory().getGrid(16, 16, .2f, 7))
                .Players(players)
                .build());
        gameHandler.randomizePlayerPos();

        // Adds scheduler to run update() every 100 milliseconds and send current game state after update
        Thread update = new Thread(() -> {
            gameHandler.update();
            getJsonMessenger().gameStateMessage(GAMES.get(lobby).getGame());
            if (gameHandler.getGame().isFinished()) {
                for (Session session : SessionHandler.SESSIONS) {
                    if (Integer.parseInt((String) session.getUserProperties().get("playerNr")) == GAMES.get(lobby).getGame().getWinner().getPlayerNr()) {
                        try {
                            session.getBasicRemote().sendText(getJsonMessenger().gameWon());
                        } catch (IOException e) {
                            LOGGER.error("Error in game scheduler thread: " + e.getMessage());
                        }

                    }
                }
                destroyGame(lobby);
            }
        });
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(update, 0, 100, TimeUnit.MILLISECONDS);
        SCHEDULED_GAME_UPDATES.put(lobby, executor);

        return gameHandler;
    }
}