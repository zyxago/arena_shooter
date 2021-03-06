package nu.te4.arena_shooter.entities.player;

import nu.te4.arena_shooter.entities.Point;

public class PlayerBuilder {
    private String name;
    private int hp;
    private int maxHp;
    private int dmg;
    private PlayerColor color;
    private int playerNr;
    private nu.te4.arena_shooter.entities.Point point;


    public PlayerBuilder() {

    }

    public Player build() throws IllegalStateException {
        if(name == null){
            throw new IllegalStateException("Player must have a name!");
        }
        if (color == null) {
            throw new IllegalStateException("Color must be set!");
        }
        if (hp <= 0) {
            hp = 1;
        }
        if (maxHp <= 0) {
            maxHp = 1;
        }
        if (dmg <= 0) {
            dmg = 1;
        }
        if (playerNr <= 0) {
            throw new IllegalStateException("Player number must be set!");
        }
        if (point == null) {
            point = new nu.te4.arena_shooter.entities.Point(0, 0);
        }
        return new Player(this);
    }

    public nu.te4.arena_shooter.entities.Point getPoint() {
        return point;
    }

    public PlayerBuilder Point(Point point) {
        this.point = point;
        return this;
    }

    public String getName() {
        return name;
    }

    public PlayerBuilder Name(String name) {
        this.name = name;
        return this;
    }

    public int getHp() {
        return hp;
    }

    public PlayerBuilder Hp(int hp) {
        this.hp = hp;
        return this;
    }

    public int getMaxHp() {
        return maxHp;
    }

    public PlayerBuilder MaxHp(int maxHp) {
        this.maxHp = maxHp;
        return this;
    }

    public int getDmg() {
        return dmg;
    }

    public PlayerBuilder Dmg(int dmg) {
        this.dmg = dmg;
        return this;
    }

    public PlayerColor getColor() {
        return color;
    }

    public PlayerBuilder Color(PlayerColor color) {
        this.color = color;
        return this;
    }

    public int getPlayerNr() {
        return playerNr;
    }

    public PlayerBuilder PlayerNr(int playerNr) {
        this.playerNr = playerNr;
        return this;
    }
}
