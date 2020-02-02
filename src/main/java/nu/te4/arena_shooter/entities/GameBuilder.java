package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.tiles.Tile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GameBuilder {
    private Map<Point, Tile> grid;
    private List<Player> players;
    private List<Item> items;
    private List<Bullet> bullets;

    public GameBuilder() {
    }

    public Game build() throws IllegalStateException{
        if(getGrid() == null){
            throw new IllegalStateException("Grid must be set!");
        }
        if(getPlayers() == null){
            throw new IllegalStateException("players must be set!");
        }
        if(getItems() == null){
            items = new ArrayList<>();
        }
        if(getBullets() == null){
            bullets = new ArrayList<>();
        }
        return new Game(this);
    }

    public Map<Point, Tile> getGrid() {
        return grid;
    }

    public GameBuilder Grid(Map<Point, Tile> grid) {
        this.grid = grid;
        return this;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public GameBuilder Players(List<Player> players) {
        this.players = players;
        return this;
    }

    public List<Item> getItems() {
        return items;
    }

    public GameBuilder Items(List<Item> items) {
        this.items = items;
        return this;
    }

    public List<Bullet> getBullets() {
        return bullets;
    }

    public GameBuilder Bullets(List<Bullet> bullets) {
        this.bullets = bullets;
        return this;
    }
}
