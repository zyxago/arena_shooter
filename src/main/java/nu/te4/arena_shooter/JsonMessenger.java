package nu.te4.arena_shooter;

import nu.te4.arena_shooter.entities.Game;
import nu.te4.arena_shooter.entities.player.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.websocket.Session;

public class JsonMessenger {

    private final Logger LOGGER = LoggerFactory.getLogger(JsonMessenger.class);

    private JsonMessenger() {
    }

    private static JsonMessenger jsonMessenger = new JsonMessenger();

    public static JsonMessenger getJsonMessenger() {
        return jsonMessenger;
    }

    /**
     * Sends state of a game to all players involved in said game
     *
     * @param game Game to get state from
     */
    public void gameStateMessage(Game game, int lobby) {
        try {
            for (Session session : SessionHandler.SESSIONS) {
                if (Integer.parseInt((String) session.getUserProperties().get("lobby")) == lobby) {
                    session.getBasicRemote().sendText(game.jsonStringState());
                }
            }
        } catch (Exception e) {
            LOGGER.error("Error in JsonMessenger.gameStateMessage: " + e.getMessage());
        }
    }

    public String updateUsersMessage() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "updateUsers")
                .add("users", factory.createArrayBuilder(usersJson()))
                .build();
        return jsonMessage.toString();
    }

    /**
     * @return Returns String that specifies how many lobbies to create
     */
    public String lobbyMessage() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "lobbyCount")
                .add("lobbies", 4)
                .build();
        return jsonMessage.toString();
    }

    /**
     * @return
     */
    private JsonArray usersJson() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonUser = factory.createArrayBuilder();
        for (Session user : SessionHandler.SESSIONS) {
            jsonUser.add(factory.createObjectBuilder()
                    .add("username", (String) user.getUserProperties().get("username"))
                    .add("playerNr", (String) user.getUserProperties().get("playerNr"))
                    .add("lobby", (String) user.getUserProperties().get("lobby")));
        }
        return jsonUser.build();
    }

    /**
     * Message to send to new users containing that users playerNr
     *
     * @param user user to get playerNr from
     * @return
     */
    public String newUserMessage(Session user) {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "newUser")
                .add("playerNr", (String) user.getUserProperties().get("playerNr"))
                .build();
        return jsonMessage.toString();
    }

    /**
     * Send to player winning a game
     *
     * @return
     */
    public String gameWon() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "won")
                .build();
        return jsonMessage.toString();
    }

    /**
     * Send to player loosing a game
     *
     * @return
     */
    public String gameLost() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "lost")
                .build();
        return jsonMessage.toString();
    }

    /**
     * Sends full state a game to all players involved in said game
     *
     * @param game Game to get state from
     */
    public void fullGameInfo(Game game, int lobby) {
        try {
            for (Session session : SessionHandler.SESSIONS) {
                if (Integer.parseInt((String) session.getUserProperties().get("lobby")) == lobby) {
                    session.getBasicRemote().sendText(game.jsonStringFullGame());
                }
            }
        } catch (Exception e) {
            LOGGER.error("Error in JsonMessenger.fullGameInfo: " + e.getMessage());
        }
    }
}
