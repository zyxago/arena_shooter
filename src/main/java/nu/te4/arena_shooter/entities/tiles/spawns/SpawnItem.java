package nu.te4.arena_shooter.entities.tiles.spawns;

import nu.te4.arena_shooter.entities.Item;
import nu.te4.arena_shooter.entities.Point;
import nu.te4.arena_shooter.entities.effects.AttackUp;
import nu.te4.arena_shooter.entities.effects.HealUp;
import nu.te4.arena_shooter.interfaces.Spawner;

import java.util.Date;

public class SpawnItem implements Spawner {

    private int cooldown;
    private long prevSpawn;

    public SpawnItem(int cooldown) {
        this.cooldown = cooldown;
        this.prevSpawn = new Date().getTime();
    }

    public boolean isSpawnReady() {
        //Get the time difference in seconds
        long diff = (new Date().getTime() - prevSpawn) / 1000 % 60;
        boolean spawnReady;
        if (diff >= cooldown) {
            spawnReady = true;
        } else {
            spawnReady = false;
        }
        return spawnReady;
    }

    @Override
    public Item spawn(Point spawnPoint) {
        setPrevSpawn(new Date().getTime());
        if (Math.random() > .1) {
            return new Item(spawnPoint, new HealUp());
        }
        return new Item(spawnPoint, new AttackUp());
    }

    public float getCooldown() {
        return cooldown;
    }

    public void setCooldown(int cooldown) {
        this.cooldown = cooldown;
    }

    public long getPrevSpawn() {
        return prevSpawn;
    }

    public void setPrevSpawn(long prevSpawn) {
        this.prevSpawn = prevSpawn;
    }

}
