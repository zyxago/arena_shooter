package nu.te4.arena_shooter.entities;

import java.awt.*;

public class PlayerBuilder {
    private int hp;
    private int maxHp;
    private int dmg;
    private Color color;
    private int playerNr;

    public PlayerBuilder(){

    }

    //TODO kolla så att man inte kan ange konstiga värden såsom dmg = -1
    public Player build(){
        return new Player(this);
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

    public Color getColor() {
        return color;
    }

    public PlayerBuilder Color(Color color) {
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
