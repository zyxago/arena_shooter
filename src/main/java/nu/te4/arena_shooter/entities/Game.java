package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.tiles.Tile;
import nu.te4.arena_shooter.entities.tiles.spawns.SpawnItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.*;
import java.util.List;

/**
 * @author erikh
 */
public class Game {

    private static final Logger LOGGER = LoggerFactory.getLogger(Game.class);

    private Tile[][] grid;
    private List<Player> players;
    private List<Item> items;
    private List<Bullet> bullets;

    public Game() {
    }

    public Game(GameBuilder build) {
        this.bullets = build.getBullets();
        this.grid = build.getGrid();
        this.items = build.getItems();
        this.players = build.getPlayers();
    }

    public Tile[][] getGrid() {
        return grid;
    }

    public void setGrid(Tile[][] grid) {
        this.grid = grid;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public List<Bullet> getBullets() {
        return bullets;
    }

    public void setBullets(List<Bullet> bullets) {
        this.bullets = bullets;
    }

    /**
     * Converts this object to JsonObject
     *
     * @return this obj as JsonObject
     */
    private JsonObject toJson() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);

        //Creates JsonArray of grid
        JsonArrayBuilder gridRows = factory.createArrayBuilder();
        for (int y = 0; y < getGrid().length; y++) {
            JsonArrayBuilder jsonArrayBuilderTiles = factory.createArrayBuilder();

            for (int x = 0; x < getGrid()[y].length; x++) {
                jsonArrayBuilderTiles
                        .add(factory.createObjectBuilder()
                                .add("tile", factory.createObjectBuilder(getGrid()[y][x].toJson())));
            }
            gridRows.add(jsonArrayBuilderTiles.build());
        }

        //Creates JsonArray of players
        JsonArrayBuilder jsonPlayers = factory.createArrayBuilder();
        for (int i = 0; i < getPlayers().size(); i++) {
            jsonPlayers.add(factory.createObjectBuilder(getPlayers().get(i).toJson()));
        }

        return factory.createObjectBuilder()
                .add("grid", factory.createArrayBuilder(gridRows.build()))
                .add("players", factory.createArrayBuilder(jsonPlayers.build()))
                .build();
    }

    public String jsonStringGame() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = factory.createObjectBuilder()
                .add("type", "game")
                .add("game", factory.createObjectBuilder(toJson()))
                .build();
        return jsonMessage.toString();
    }
}
