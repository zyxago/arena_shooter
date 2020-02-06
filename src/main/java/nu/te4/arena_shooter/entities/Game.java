package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.entities.tiles.Tile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.json.*;
import java.util.List;
import java.util.Map;

public class Game {

    private static final Logger LOGGER = LoggerFactory.getLogger(Game.class);

    private Map<Point, Tile> grid;
    private List<Player> players;
    private List<Item> items;
    private List<Bullet> bullets;
    private List<Tile> spawnTiles;
    private boolean finished = false;
    private Player winner;

    public Game() {
    }

    public Game(GameBuilder build) {
        this.bullets = build.getBullets();
        this.grid = build.getGrid();
        this.items = build.getItems();
        this.players = build.getPlayers();
        this.spawnTiles = build.getSpawnTiles();
    }

    public Player getWinner() {
        return winner;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
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

    public List<Tile> getSpawnTiles() {
        return spawnTiles;
    }

    public void setSpawnTiles(List<Tile> spawnTiles) {
        this.spawnTiles = spawnTiles;
    }

    /**
     * @return Returns this object as JsonObject
     */
    private JsonObject toJson() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        return factory.createObjectBuilder()
                .add("grid", factory.createArrayBuilder(jsonGrid()))
                .add("players", factory.createArrayBuilder(jsonPlayers()))
                .add("bullets", factory.createArrayBuilder(jsonBullets()))
                .add("items", factory.createArrayBuilder(jsonItems()))
                .build();
    }

    /**
     * @return Returns jsonArray of all tiles in this game
     */
    private JsonArray jsonGrid() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonGrid = factory.createArrayBuilder();
        for (Tile tile : getGrid().values()) {
            jsonGrid.add(factory.createObjectBuilder(tile.toJson()));
        }
        return jsonGrid.build();
    }

    /**
     * @return Returns jsonArray of all players in this game
     */
    private JsonArray jsonPlayers() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonPlayers = factory.createArrayBuilder();
        for (Player player : getPlayers()) {
            jsonPlayers.add(factory.createObjectBuilder(player.toJson()));
        }
        return jsonPlayers.build();
    }

    /**
     * @return Returns jsonArray of all bullets in this game
     */
    private JsonArray jsonBullets() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonBullets = factory.createArrayBuilder();
        for (Bullet bullet : getBullets()) {
            jsonBullets.add(factory.createObjectBuilder(bullet.toJson()));
        }
        return jsonBullets.build();
    }

    /**
     * @return Returns jsonArray of all items in this game
     */
    private JsonArray jsonItems() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder jsonBullets = factory.createArrayBuilder();
        for (Item item : getItems()) {
            jsonBullets.add(factory.createObjectBuilder(item.toJson()));
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

    /**
     * Json stringify this games dynamic objects like players, items and bullets
     *
     * @return Returns json string of this games dynamic objects (players, bullets, items)
     */
    public String jsonStringState() {
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonObject jsonMessage = factory.createObjectBuilder()
                .add("type", "gameState")
                .add("players", factory.createArrayBuilder(jsonPlayers()))
                .add("bullets", factory.createArrayBuilder(jsonBullets()))
                .add("items", factory.createArrayBuilder(jsonItems()))
                .build();
        return jsonMessage.toString();
    }
}