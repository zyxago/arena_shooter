package nu.te4.arena_shooter.endpoint;

import java.util.HashSet;
import java.util.Set;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author erikh
 */
@ServerEndpoint("/endpoint")
public class WSEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(WSEndpoint.class);

    static Set<Session> SESSIONS = new HashSet<>();

    @OnMessage
    public void onMessage(String message, Session user) {

    }

    @OnOpen
    public void open(Session user) {
        LOGGER.debug("New Session created");
        SESSIONS.add(user);
        try {
            user.getBasicRemote().sendText(newUserMessage("User Connected"));
            user.getBasicRemote().sendText(sendCurrentGameState());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    @OnClose
    public void close(Session user) {
        SESSIONS.remove(user);
    }

    private String newUserMessage(String msg) {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("newUser", msg)
                .build();
        return jsonMessage.toString();
    }

    private String sendCurrentGameState() {
        int[][] grid = new int[16][16];
        JsonArrayBuilder jsonArrayBuilderY = Json.createArrayBuilder();
        
        for (int y = 0; y < grid.length; y++) {
            int lengthX = grid[y].length;
            JsonArrayBuilder jsonArrayBuilderX = Json.createArrayBuilder();
            for (int x = 0; x < lengthX; x++) {
                jsonArrayBuilderX.add(grid[y][x]);
            }
            jsonArrayBuilderY.add(jsonArrayBuilderX.build());
        }
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("map", jsonArrayBuilderY.build().toString())
                .build();
        return jsonMessage.toString();
    }

}
