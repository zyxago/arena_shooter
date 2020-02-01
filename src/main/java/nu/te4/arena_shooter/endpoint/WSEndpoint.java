package nu.te4.arena_shooter.endpoint;

import java.awt.*;
import java.util.*;
import java.util.List;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import nu.te4.arena_shooter.JsonMessenger;
import nu.te4.arena_shooter.entities.*;
import nu.te4.arena_shooter.entities.Point;
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
        LOGGER.info("Message: " + message);
        String msgType = message.substring(0, message.indexOf(':'));
        message = message.substring(message.indexOf(':') + 1);

        try {//TODO bryt upp i funktioner om det går
            if (user.getUserProperties().get("username") == null && msgType.equals("name")) {
                user.getUserProperties().put("username", message);
                user.getUserProperties().put("lobby", "0");
                broadcastMessege(JsonMessenger.getJsonMessenger().updateUsersMessage(SESSIONS));

            } else if (msgType.equals("join")) {
                user.getUserProperties().put("lobby", message);
                broadcastMessege(JsonMessenger.getJsonMessenger().updateUsersMessage(SESSIONS));

            } else if (msgType.equals("start")) {
                int lobby = Integer.parseInt((String) user.getUserProperties().get("lobby"));
                List<Player> players = new ArrayList<>();
                for (Session session : SESSIONS) {
                    if ((session.getUserProperties().get("lobby")).equals(Integer.toString(lobby))) {
                        players.add(new PlayerBuilder()
                                .Point(new Point(0,0))
                                .Color(Color.blue)
                                .Dmg(1)
                                .Hp(3)
                                .MaxHp(3)
                                .PlayerNr(Integer.parseInt((String) session.getUserProperties().get("playerNr")))
                                .build());
                        LOGGER.info("Player added to list!");
                    }
                }
                GAMES.put(lobby, new GameBuilder()
                        .Grid(new GridFactory().getGrid(16, 16, .2f, 0))
                        .Players(players)
                        .build());
                JsonMessenger.getJsonMessenger().gameStateMessage(SESSIONS, GAMES.get(lobby));
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.onMessage" + e.getMessage());
        }
    }

    @OnOpen
    public void open(Session user) {
        LOGGER.debug("New Session created");
        SESSIONS.add(user);
        user.getUserProperties().put("playerNr", Integer.toString(SESSIONS.size()));//TODO fixa bättre lösning, om någon avbryter sin anslutning så kan nästa få samma nummer som någon annan
        try {
            user.getBasicRemote().sendText(JsonMessenger.getJsonMessenger().newUserMessage());
            user.getBasicRemote().sendText(JsonMessenger.getJsonMessenger().lobbyMessage());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    @OnClose
    public void close(Session user) {
        SESSIONS.remove(user);
    }

    public void broadcastMessege(String msg) {
        try {
            for (Session session : SESSIONS) {
                session.getBasicRemote().sendText(msg);
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.broadcastMessage: " + e.getMessage());
        }

    }

}
