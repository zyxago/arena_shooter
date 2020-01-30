/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.te4.arena_shooter.endpoint;

import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author erikh
 */
@ServerEndpoint("/endpoint")
public class WSEndpoint {

    static Set<Session> SESSIONS = new HashSet<>();
    
    @OnMessage
    public void onMessage(String message, Session user) {
        
    }
    
    @OnOpen
    public void open(Session session){
        SESSIONS.add(session);
    }
    
    @OnClose
    public void close(Session session){
        SESSIONS.remove(session);
    }
    
}
