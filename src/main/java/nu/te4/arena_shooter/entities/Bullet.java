package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.entities.player.PlayerColor;
import nu.te4.arena_shooter.interfaces.Moveable;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author erikh
 */
public class Bullet extends Entity implements Moveable {
    private Player owner;
    private PlayerColor color;
    private int dirX;
    private int dirY;
    private boolean dead = false;

    public Bullet(Point point, Player owner, PlayerColor color, int dirX, int dirY) {
        super(point);
        this.owner = owner;
        this.color = color;
        this.dirX = dirX;
        this.dirY = dirY;
    }

    public Player getOwner() {
        return owner;
    }

    public void setOwner(Player owner) {
        this.owner = owner;
    }

    public PlayerColor getColor() {
        return color;
    }

    public void setColor(PlayerColor color) {
        this.color = color;
    }

    public int getDirX() {
        return dirX;
    }

    public void setDirX(int dirX) {
        this.dirX = dirX;
    }

    public int getDirY() {
        return dirY;
    }

    public void setDirY(int dirY) {
        this.dirY = dirY;
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }

    public void move(int... dir){
        setPoint(new Point(getPoint().getX()+getDirX(), getPoint().getY() + getDirY()));
    }

    public JsonObject toJson(){
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObjectBuilder bullet = factory.createObjectBuilder();
        return bullet.add("color", color.toString())
                .add("point", factory.createObjectBuilder(getPoint().toJson()))
                .build();
    }
            
}
