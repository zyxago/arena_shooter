package nu.te4.arena_shooter.entities.tiles;

import nu.te4.arena_shooter.interfaces.Spawner;
import nu.te4.arena_shooter.entities.Entity;
import nu.te4.arena_shooter.entities.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 * @author erikh
 */
public class Tile extends Entity {

    private boolean solid;
    private Spawner spawnable;

    public Tile(Point point, boolean solid, Spawner spawnable) {
        super(point);
        this.solid = solid;
        this.spawnable = spawnable;
    }

    public Tile() {
    }

    public boolean isSolid() {
        return solid;
    }

    public void setSolid(boolean solid) {
        this.solid = solid;
    }

    public Spawner getSpawnable() {
        return spawnable;
    }

    public void setSpawnable(Spawner spawnable) {
        this.spawnable = spawnable;
    }

    public boolean isSpawner() {
        return getSpawnable() != null;
    }

    public JsonObject toJson() {
        JsonObjectBuilder tileBuilder = Json.createObjectBuilder();
        tileBuilder.add("solid", solid)
                .add("point", getPoint().toJson());
        if (spawnable != null) {
            tileBuilder.add("spawns", true);
        } else {
            tileBuilder.add("spawns", false);
        }
        return tileBuilder.build();
    }
}
