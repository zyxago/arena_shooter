package nu.te4.arena_shooter.entities;

import java.awt.Color;
import java.util.List;

/**
 *
 * @author erikh
 */
public class Player extends Entity implements Moveable{
    byte hp;
    byte dmg;
    byte playerNr;
    Color color;
    List<Bullet> bullets;
    
    public boolean move(Point newPos){
        return false;
    }
}
