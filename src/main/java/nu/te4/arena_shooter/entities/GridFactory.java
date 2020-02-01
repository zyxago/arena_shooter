package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.Point;
import nu.te4.arena_shooter.entities.tiles.Tile;

public class GridFactory {
    /**
     *
     * @param width Width of grid
     * @param height height of grid
     * @param obstacleRate Chance of tile being solid: 1 = 100%, 0 = 0%
     * @param spawnTiles Amount of tiles being Spawn Tiles
     * @return Returns a 2d array of Tile objects
     */
    public Tile[][] getGrid(int width, int height, float obstacleRate, int spawnTiles){
        Tile[][] grid = new Tile[height][width];
        for(int y = 0; y < height; y++){
            for(int x = 0; x < width; x++){
                boolean solid = false;
                if(Math.random() < obstacleRate){
                    solid = true;
                }
                grid[y][x] = new Tile(new Point(x, y), solid, null);//TODO implement spawnable tiles
            }
        }
        return grid;
    }
}
