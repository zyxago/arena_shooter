package nu.te4.arena_shooter.entities.tiles;

import nu.te4.arena_shooter.entities.Entity;
import nu.te4.arena_shooter.entities.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author erikh
 */
public class Tile extends Entity{

    private static final Logger LOGGER = LoggerFactory.getLogger(Tile.class);

    boolean solid;
    Spawer spawnable;

    public Tile(Point point, boolean solid, Spawer spawnable) {
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

    public Spawer getSpawnable() {
        return spawnable;
    }

    public void setSpawnable(Spawer spawnable) {
        this.spawnable = spawnable;
    }

    public JsonObject toJson(){
        LOGGER.debug("To json called");
        JsonObjectBuilder tileBuilder = Json.createObjectBuilder();
        return tileBuilder
                .add("solid", solid)
                .add("x", getPoint().getX())
                .add("y", getPoint().getY())
                .build();
    }
}
