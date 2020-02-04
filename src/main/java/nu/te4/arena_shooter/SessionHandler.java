package nu.te4.arena_shooter;

import javax.websocket.Session;
import java.util.HashSet;
import java.util.Set;

public class SessionHandler {

    public static final Set<Session> SESSIONS = new HashSet<>();

    private SessionHandler(){}
}
