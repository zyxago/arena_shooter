package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.tiles.Tile;

import java.util.List;

public class GameBuilder {
    private Tile[][] grid;
    private List<Player> players;
    private List<Item> items;
    private List<Bullet> bullets;

    public GameBuilder() {
    }

    //TODO kolla så att man inte kan ange konstiga värden såsom players = null
    public Game build() {
        return new Game(this);
    }

    public Tile[][] getGrid() {
        return grid;
    }

    public GameBuilder Grid(Tile[][] grid) {
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
