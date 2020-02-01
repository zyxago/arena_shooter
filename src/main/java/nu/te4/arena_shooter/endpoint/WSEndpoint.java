package nu.te4.arena_shooter.endpoint;

import java.awt.*;
import java.util.*;
import java.util.List;
import javax.json.*;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import nu.te4.arena_shooter.entities.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author erikh
 */
@ServerEndpoint("/endpoint")
public class WSEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(WSEndpoint.class);
    static Map<Integer, Game> GAMES = new HashMap<>();
    static Set<Session> SESSIONS = new HashSet<>();

    @OnMessage
    public void onMessage(String message, Session user) {
        LOGGER.info(message);
        String msgType = message.substring(0, message.indexOf(':'));
        message = message.substring(message.indexOf(':') + 1);
        try {//TODO bryt upp i funktioner
            if (user.getUserProperties().get("username") == null && msgType.equals("name")) {
                user.getUserProperties().put("username", message);
                user.getUserProperties().put("lobby", "0");
                for (Session session : SESSIONS) {
                    session.getBasicRemote().sendText(updateUsers());
                }
            } else if (msgType.equals("join")) {
                user.getUserProperties().put("lobby", message);
                for (Session session : SESSIONS) {
                    session.getBasicRemote().sendText(updateUsers());
                }
            } else if (msgType.equals("start")) {
                int lobby = Integer.parseInt((String) user.getUserProperties().get("lobby"));
                List<Player> players = new ArrayList<>();
                for (Session session : SESSIONS) {
                    if (Integer.parseInt((String) session.getUserProperties().get("lobby")) == lobby) {
                        players.add(new PlayerBuilder()
                                .Color(Color.blue)
                                .Dmg(1)
                                .Hp(3)
                                .MaxHp(3)
                                .PlayerNr(Integer.parseInt((String) session.getUserProperties().get("playerNr")))
                                .build());
                    }
                }
                GAMES.put(lobby, new GameBuilder()
                        .Grid(new GridFactory().getGrid(16, 16, 0, 0))
                        .Players(players)
                        .build());
                sendGameState(lobby);
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.onMessage" + e.getMessage());
        }
    }

    @OnOpen
    public void open(Session user) {
        LOGGER.debug("New Session created");
        SESSIONS.add(user);
        user.getUserProperties().put("playerNr", SESSIONS.size());//TODO fixa bättre lösning, om någon avbryter sin anslutning så kan nästa få samma nummer som någon annan
        try {
            user.getBasicRemote().sendText(newUserMessage());
            user.getBasicRemote().sendText(lobbyMessage());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    @OnClose
    public void close(Session user) {
        SESSIONS.remove(user);
    }

    //========================================================================================
    //TODO skapa någon form av message klass, och ha alla funktioner angående meddelanden där

    private void sendGameState(int lobby) {
        try {
            for (Session session : SESSIONS) {
                if (Integer.parseInt((String) session.getUserProperties().get("lobby")) == lobby) {
                    session.getBasicRemote().sendText(GAMES.get(lobby).jsonStringGame());
                }
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.sendGameState: " + e.getMessage());
        }

    }

    private String updateUsers() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "updateUsers")
                .add("users", factory.createArrayBuilder(usersJson()))
                .build();
        return jsonMessage.toString();
    }

    private String lobbyMessage() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "lobbyCount")
                .add("lobbies", 4)
                .build();
        return jsonMessage.toString();
    }

    private JsonArray usersJson() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonUser = factory.createArrayBuilder();
        for (Session user : SESSIONS) {
            jsonUser.add(factory.createObjectBuilder()
                    .add("username", (String) user.getUserProperties().get("username"))
                    .add("lobby", (String) user.getUserProperties().get("lobby")));
        }
        return jsonUser.build();
    }

    private String newUserMessage() {
        JsonObject jsonMessage = Json.createObjectBuilder()
                .add("type", "newUser")
                .build();
        return jsonMessage.toString();
    }

}
