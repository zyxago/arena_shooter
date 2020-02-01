package nu.te4.arena_shooter;

import nu.te4.arena_shooter.entities.Game;
import nu.te4.arena_shooter.entities.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.*;
import javax.websocket.Session;
import java.util.Set;

public class JsonMessenger {

    private final Logger LOGGER = LoggerFactory.getLogger(JsonMessenger.class);

    private JsonMessenger(){ }

    private static JsonMessenger jsonMessenger = new JsonMessenger();

    public static JsonMessenger getJsonMessenger(){
        return jsonMessenger;
    }

    /**
     *
     * @param SESSIONS
     * @param game
     */
    public void gameStateMessage(Set<Session> SESSIONS, Game game) {
        try {
            for (Session session : SESSIONS) {
                for(Player player: game.getPlayers()){
                    if(Integer.toString(player.getPlayerNr()).equals(session.getUserProperties().get("playerNr"))){
                        session.getBasicRemote().sendText(game.jsonStringGame());
                    }
                }
            }
        } catch (Exception e) {
            LOGGER.error("Error in JsonMessenger.sendGameState: " + e.getMessage());
        }

    }

    /**
     *
     * @param SESSIONS
     * @return
     */
    public String updateUsersMessage(Set<Session> SESSIONS) {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "updateUsers")
                .add("users", factory.createArrayBuilder(usersJson(SESSIONS)))
                .build();
        return jsonMessage.toString();
    }

    /**
     *
     * @return
     */
    public String lobbyMessage() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "lobbyCount")
                .add("lobbies", 4)
                .build();
        return jsonMessage.toString();
    }

    /**
     *
     * @param SESSIONS
     * @return
     */
    private JsonArray usersJson(Set<Session> SESSIONS) {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonUser = factory.createArrayBuilder();
        for (Session user : SESSIONS) {
            jsonUser.add(factory.createObjectBuilder()
                    .add("username", (String) user.getUserProperties().get("username"))
                    .add("lobby", (String) user.getUserProperties().get("lobby")));
        }
        return jsonUser.build();
    }

    /**
     *
     * @return
     */
    public String newUserMessage() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "newUser")
                .build();
        return jsonMessage.toString();
    }
}
