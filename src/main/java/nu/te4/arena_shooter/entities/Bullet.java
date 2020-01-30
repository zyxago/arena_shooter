package nu.te4.arena_shooter.entities;

import java.awt.Color;

/**
 *
 * @author erikh
 */
public class Bullet extends Entity implements Moveable{
    Player owner;
    Color color; 
    
    public boolean move(Point newPos){
        return false;
    }
            
}
