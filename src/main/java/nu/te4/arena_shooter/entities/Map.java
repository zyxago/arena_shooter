package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.tiles.Tile;
import nu.te4.arena_shooter.entities.tiles.spawns.SpawnItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.*;

/**
 *
 * @author erikh
 */
public class Map {

    private static final Logger LOGGER = LoggerFactory.getLogger(Map.class);

    private Tile[][] grid = new Tile[16][16];

    public Map() {
    }

    public Map(Tile[][] grid) {
        this.grid = grid;
    }

    public Tile[][] getGrid() {
        return grid;
    }

    public void setGrid(Tile[][] grid) {
        this.grid = grid;
    }

    public JsonObject toJson() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder gridRows = factory.createArrayBuilder();

        for (int y = 0; y < getGrid().length; y++) {
            JsonArrayBuilder jsonArrayBuilderTiles = factory.createArrayBuilder();

            for (int x = 0; x < getGrid()[y].length; x++) {

                //TEMP sets tiles, should be set by default
                getGrid()[y][x] = new Tile(new Point(x,y),false,new SpawnItem());

                jsonArrayBuilderTiles
                        .add(factory.createObjectBuilder()
                        .add("tile", factory.createObjectBuilder(getGrid()[y][x].toJson())));
            }
            gridRows.add(jsonArrayBuilderTiles.build());
        }
        return factory.createObjectBuilder()
                .add("grid", factory.createArrayBuilder(gridRows.build()))
                .build();
    }
}
