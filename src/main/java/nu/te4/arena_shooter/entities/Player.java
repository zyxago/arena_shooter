package nu.te4.arena_shooter.entities;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.awt.Color;
import java.util.List;

/**
 *
 * @author erikh
 */
public class Player extends Entity implements Moveable{
    private int hp;
    private int maxHp;
    private int dmg;
    private Color color;
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

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public int getPlayerNr() {
        return playerNr;
    }

    public void setPlayerNr(int playerNr) {
        this.playerNr = playerNr;
    }

    public boolean move(Point newPos){
        return false;
    }

    public JsonObject toJson(){
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObjectBuilder player = factory.createObjectBuilder();
        return player.add("hp", getHp())
                .add("maxHp", getMaxHp())
                .add("dmg", getDmg())
                .add("color", "rgb("+getColor().getRed()+','+getColor().getGreen()+','+getColor().getBlue()+')')
                .add("playerNr", getPlayerNr())
                .add("point", factory.createObjectBuilder(getPoint().toJson()))
                .build();
    }
}
