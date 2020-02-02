package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.interfaces.Moveable;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author erikh
 */
public class Player extends Entity implements Moveable {
    private int hp;
    private int maxHp;
    private int dmg;
    private PlayerColor color;
    private int playerNr;

    public Player(PlayerBuilder build){
        super(build.getPoint());
        hp = build.getHp();
        maxHp = build.getMaxHp();
        dmg = build.getDmg();
        color = build.getColor();
        playerNr = build.getPlayerNr();
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public int getMaxHp() {
        return maxHp;
    }

    public void setMaxHp(int maxHp) {
        this.maxHp = maxHp;
    }

    public int getDmg() {
        return dmg;
    }

    public void setDmg(int dmg) {
        this.dmg = dmg;
    }

    public PlayerColor getColor() {
        return color;
    }

    public void setColor(PlayerColor color) {
        this.color = color;
    }

    public int getPlayerNr() {
        return playerNr;
    }

    public void setPlayerNr(int playerNr) {
        this.playerNr = playerNr;
    }

    public void move(int dirX, int dirY){
        setPoint(new Point(getPoint().getX()+dirX, getPoint().getY() + dirY));
    }

    public JsonObject toJson(){
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObjectBuilder player = factory.createObjectBuilder();
        return player.add("hp", getHp())
                .add("maxHp", getMaxHp())
                .add("dmg", getDmg())
                .add("color", color.toString())
                .add("playerNr", getPlayerNr())
                .add("point", factory.createObjectBuilder(getPoint().toJson()))
                .build();
    }
}
