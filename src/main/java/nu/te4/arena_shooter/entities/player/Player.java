package nu.te4.arena_shooter.entities.player;

import nu.te4.arena_shooter.entities.Entity;
import nu.te4.arena_shooter.entities.Point;
import nu.te4.arena_shooter.interfaces.Moveable;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class Player extends Entity implements Moveable {
    private String name;
    private int hp;
    private int maxHp;
    private int dmg;
    private PlayerColor color;
    private int playerNr;
    private boolean dead;

    public Player(PlayerBuilder build) {
        super(build.getPoint());
        name = build.getName();
        hp = build.getHp();
        maxHp = build.getMaxHp();
        dmg = build.getDmg();
        color = build.getColor();
        playerNr = build.getPlayerNr();
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }

    public int getHp() {
        return hp;
    }

    public void setHp(int hp) {
        this.hp = hp;
        if(hp > getMaxHp()){
            this.hp = getMaxHp();
        }
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

    public void move(int... dir) {
        setPoint(new Point(getPoint().getX() + dir[0], getPoint().getY() + dir[1]));
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return Returns this object as JsonObject
     */
    public JsonObject toJson() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObjectBuilder player = factory.createObjectBuilder();
        return player.add("hp", getHp())
                .add("maxHp", getMaxHp())
                .add("dmg", getDmg())
                .add("color", color.toString())
                .add("playerNr", getPlayerNr())
                .add("point", factory.createObjectBuilder(getPoint().toJson()))
                .add("name", getName())
                .build();
    }
}
