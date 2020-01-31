package nu.te4.arena_shooter.endpoint;

import java.util.HashSet;
import java.util.Set;
import javax.json.*;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import nu.te4.arena_shooter.entities.Map;
import nu.te4.arena_shooter.entities.Point;
import nu.te4.arena_shooter.entities.tiles.Tile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author erikh
 */
@ServerEndpoint("/endpoint")
public class WSEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(WSEndpoint.class);

    static Set<Session> SESSIONS = new HashSet<>();

    @OnMessage
    public void onMessage(String message, Session user) {
        try {
            if(user.getUserProperties().get("username") == null) {
                user.getUserProperties().put("username", message);
                user.getBasicRemote().sendText(buildMessage(message));
            }
        }catch (Exception e){
            LOGGER.error("Error in WSEndpoint.onMessage" + e.getMessage());
        }
    }

    @OnOpen
    public void open(Session user) {
        LOGGER.debug("New Session created");
        SESSIONS.add(user);
        try {
            user.getBasicRemote().sendText(newUserMessage());
            user.getBasicRemote().sendText(sendCurrentGameState());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    @OnClose
    public void close(Session user) {
        SESSIONS.remove(user);
    }

    private String buildMessage(String msg){
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "username")
                .add("username", msg)
                .build();
        return jsonMessage.toString();
    }

    private String newUserMessage() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "newUser")
                .build();
        return jsonMessage.toString();
    }

    private String sendCurrentGameState() {
        Map map = new Map();
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = factory.createObjectBuilder()
                .add("type", "map")
                .add("map", factory.createObjectBuilder(map.toJson()))
                .build();
        return jsonMessage.toString();
    }

}
