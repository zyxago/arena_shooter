package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.interfaces.Moveable;

import java.awt.Color;

/**
 *
 * @author erikh
 */
public class Bullet extends Entity implements Moveable {
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

    public void move(int dirX, int dirY){
        setPoint(new Point(getPoint().getX()+dirX, getPoint().getY() + dirY));
    }
            
}
