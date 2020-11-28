package nu.te4.arena_shooter.resources;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import nu.te4.arena_shooter.SessionHandler;
import nu.te4.arena_shooter.beans.GameBean;
import nu.te4.arena_shooter.beans.UserBean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static nu.te4.arena_shooter.JsonMessenger.getJsonMessenger;

@ServerEndpoint("/endpoint")
public class WSEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(WSEndpoint.class);
    private static final UserBean userBean = new UserBean();
    private static final GameBean gameBean = new GameBean();

    /**
     * When users(sessions) send a message this will capture it and handle it
     *
     * @param message Message that a user sent
     * @param user    User that sent the message
     */
    @OnMessage
    public void onMessage(String message, Session user) {
        String msgType = message.substring(0, message.indexOf(':'));
        message = message.substring(message.indexOf(':') + 1);

        try {
            // If new user set username and entering lobby
            if (user.getUserProperties().get("username") == null && msgType.equals("name")) {
                broadcastMessege(userBean.initUser(user, message));
                broadcastMessege(userBean.chat(user, "has joined the lobby!"));
            } else if (msgType.equals("join")) {
                broadcastMessege(userBean.chat(user, "has left the lobby!"));
                broadcastMessege(gameBean.joinGameLobby(user, message));
                broadcastMessege(userBean.chat(user, "has joined the lobby!"));
            } else if (msgType.equals("chat")) {
                broadcastMessege(userBean.chat(user, message));
            } else {
                int lobby = Integer.parseInt((String) user.getUserProperties().get("lobby"));

                if (msgType.equals("start")) {
                    gameBean.startGame(lobby);
                } else {
                    if (!message.equals("")) {
                        int playerNr = Integer.parseInt((String) user.getUserProperties().get("playerNr"));
                        int dirX = Integer.parseInt(message.substring(0, message.indexOf(",")));
                        int dirY = Integer.parseInt(message.substring(message.indexOf(",") + 1));

                        if (msgType.equals("move")) {
                            gameBean.moveAction(playerNr, dirX, dirY, lobby);
                        } else if (msgType.equals("attack")) {
                            gameBean.attackAction(playerNr, dirX, dirY, lobby);
                        }
                    }
                }
                getJsonMessenger().gameStateMessage(gameBean.getGame(lobby));
            }
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.onMessage" + e.getMessage());
        }
    }

    /**
     * When a new session connection is established save session in list
     *
     * @param user New session user
     */
    @OnOpen
    public void open(Session user) {
        userBean.newUser(user);
        try {
            user.getBasicRemote().sendText(getJsonMessenger().newUserMessage(user));
            user.getBasicRemote().sendText(getJsonMessenger().lobbyMessage());
        } catch (Exception e) {
            LOGGER.error("Error in WSEndpoint.open: " + e.getMessage());
        }

    }

    /**
     * Removes a user from list of sessions when connection is closed
     *
     * @param user User closing connection
     */
    @OnClose
    public void close(Session user) {
        gameBean.removePlayer(user);
        SessionHandler.SESSIONS.remove(user);
        broadcastMessege(userBean.chat(user, "disconnected"));
        broadcastMessege(getJsonMessenger().updateUsersMessage());

    }

    /**
     * Sends a message to all currently connected sessions
     *
     * @param msg Message to send
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
}