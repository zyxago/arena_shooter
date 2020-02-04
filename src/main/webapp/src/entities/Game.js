import Player from "./Player";
import Tile from "./Tile";
import Bullet from "./Bullet";

export default class Game {
    constructor({grid, players, bullets, items}) {
        this.grid = grid.map((tile) => new Tile(tile));
        this.players = players.map((player) => new Player(player));
        this.bullets = bullets.map((bullet) => new Bullet(bullet));
        this.items = items
    }

    /**
     * Updates current state of players and bullets
     * @param players
     * @param bullets
     */
    update(players, bullets){
        console.log("PLAYERS" + players + "BULLETS" + bullets);
        this.players = players.map((player) => new Player(player));
        this.bullets = bullets.map((bullet) => new Bullet(bullet));
    }

    /**
     * Draws current game state to canvas
     * @param ctx Canvas context
     */
    draw(ctx) {
        const size = ctx.canvas.width / Math.sqrt(this.grid.length);
        //Draw tiles
        for (const tile of this.grid) {
            if (!tile.solid) {
                if (tile.spawns) {
                    ctx.fillStyle = "green"
                } else {
                    ctx.fillStyle = "white";
                }
            } else {
                ctx.fillStyle = "brown";
            }
            ctx.fillRect(tile.point.x * size, tile.point.y * size, size, size);
            ctx.strokeRect(tile.point.x * size, tile.point.y * size, size, size);

            // DEBUG
            // ctx.fillStyle = "black";
            // ctx.fillText(`x:[${tile.point.x}] y:[${tile.point.y}]`, tile.point.x * size + 2, tile.point.y * size + 10);
        }
        //Draw players
        for (const player of this.players) {
            player.draw(ctx, size);
        }

        //Draw bullets
        for(const bullet of this.bullets){
            bullet.draw(ctx, size);
        }
    }
}