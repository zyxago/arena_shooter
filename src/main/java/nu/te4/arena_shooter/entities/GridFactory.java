package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.tiles.Tile;
import nu.te4.arena_shooter.entities.tiles.spawns.SpawnItem;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class GridFactory {
    /**
     * @param width        Width of grid
     * @param height       Height of grid
     * @param obstacleRate Chance of tile being solid: 1 = 100%, 0 = 0%
     * @param spawnTiles   Amount of tiles being Spawn Tiles
     * @return Returns a 2d array of Tile objects
     */
    public Map<Point, Tile> getGrid(int width, int height, float obstacleRate, int spawnTiles) {
        Map<Point, Tile> grid = new HashMap<>();
        Random r = new Random();
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                boolean solid = false;
                if (Math.random() < obstacleRate) {
                    solid = true;
                }
                grid.put(new Point(x, y), new Tile(new Point(x, y), solid, null));
            }
        }
        //Add spawn tiles
        for (int i = 0; i < spawnTiles; i++) {
            Point point = new Point(r.nextInt(width), r.nextInt(height));
            if (!grid.get(point).isSolid()) {
                grid.get(point).setSpawnable(new SpawnItem(30));
            }
        }
        return grid;
    }
}
