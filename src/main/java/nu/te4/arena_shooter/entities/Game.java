package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.entities.tiles.Tile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.*;
import java.util.List;
import java.util.Map;

/**
 * @author erikh
 */
public class Game {

    private static final Logger LOGGER = LoggerFactory.getLogger(Game.class);

    private Map<Point, Tile> grid;
    private List<Player> players;
    private List<Item> items;
    private List<Bullet> bullets;
    private boolean finished = false;

    public Game() {
    }

    public Game(GameBuilder build) {
        this.bullets = build.getBullets();
        this.grid = build.getGrid();
        this.items = build.getItems();
        this.players = build.getPlayers();
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public Map<Point, Tile> getGrid() {
        return grid;
    }

    public void setGrid(Map<Point, Tile> grid) {
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
        JsonArrayBuilder gridArray = factory.createArrayBuilder();
        for (Tile tile : getGrid().values()) {
            gridArray.add(factory.createObjectBuilder(tile.toJson()));
        }

        return factory.createObjectBuilder()
                .add("grid", factory.createArrayBuilder(gridArray.build()))
                .add("players", factory.createArrayBuilder(jsonPlayers()))
                .add("bullets", factory.createArrayBuilder(jsonBullets()))
                .build();
    }

    private JsonArray jsonPlayers() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonPlayers = factory.createArrayBuilder();
        for (Player player : getPlayers()) {
            jsonPlayers.add(factory.createObjectBuilder(player.toJson()));
        }
        return jsonPlayers.build();
    }

    private JsonArray jsonBullets() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonBullets = factory.createArrayBuilder();
        for (Bullet bullet : getBullets()) {
            jsonBullets.add(factory.createObjectBuilder(bullet.toJson()));
        }
        return jsonBullets.build();
    }

    /**
     * Json stringify this game object
     *
     * @return Returns a json string of this object
     */
    public String jsonStringFullGame() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = factory.createObjectBuilder()
                .add("type", "game")
                .add("game", factory.createObjectBuilder(toJson()))
                .build();
        return jsonMessage.toString();
    }

    public String jsonStringState() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = factory.createObjectBuilder()
                .add("type", "gameState")
                .add("players", factory.createArrayBuilder(jsonPlayers()))
                .add("bullets", factory.createArrayBuilder(jsonBullets()))
                .build();
        return jsonMessage.toString();
    }
}
