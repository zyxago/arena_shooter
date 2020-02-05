package nu.te4.arena_shooter.beans;

import nu.te4.arena_shooter.GameHandler;
import nu.te4.arena_shooter.SessionHandler;
import nu.te4.arena_shooter.entities.player.Player;

import javax.ejb.Stateless;
import javax.websocket.Session;

import static nu.te4.arena_shooter.JsonMessenger.getJsonMessenger;

@Stateless
public class UserBean {

    /**
     * Sets playerNr on new user
     * @param user User to set player number on
     */
    public void newUser(Session user){
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
    }

    /**
     * Sets username and lobby
     * @param user User to set values on
     * @param name Username of user
     * @return Returns Json String of users new state
     */
    public String initUser(Session user, String name) {
        user.getUserProperties().put("username", name);
        user.getUserProperties().put("lobby", "0");
        return getJsonMessenger().updateUsersMessage();
    }
}
