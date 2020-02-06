package nu.te4.arena_shooter.interfaces;

import nu.te4.arena_shooter.entities.Entity;
import nu.te4.arena_shooter.entities.Point;

public interface Spawner<T extends Entity> {
    T spawn(Point spawnPoint);
    boolean isSpawnReady();
}
