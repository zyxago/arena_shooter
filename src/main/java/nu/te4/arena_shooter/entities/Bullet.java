package nu.te4.arena_shooter.entities;

import java.awt.Color;

/**
 *
 * @author erikh
 */
public class Bullet extends Entity implements Moveable{
    private Player owner;
    private Color color;

    public Bullet(Point point, Player owner, Color color) {
        super(point);
        this.owner = owner;
        this.color = color;
    }

    public Player getOwner() {
        return owner;
    }

    public void setOwner(Player owner) {
        this.owner = owner;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public boolean move(Point newPos){
        return false;
    }
            
}
