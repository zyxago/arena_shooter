import Player from "./Player";
import Tile from "./Tile";
import Bullet from "./Bullet";
import Item from "./Item";

export default class Game {
    /**
     *
     * @param {Array<Object>}grid
     * @param {Array<Object>}players
     * @param {Array<Object>}bullets
     * @param {Array<Object>}items
     */
    constructor({grid, players, bullets, items}) {
        this.grid = grid.map((tile) => new Tile(tile));
        this.players = players.map((player) => new Player(player));
        this.bullets = bullets.map((bullet) => new Bullet(bullet));
        this.items = items.map((item) => new Item(item));
    }

    /**
     * Updates current state of players, bullets and items
     *
     * @param {Array<Object>}players new player array to set old one to
     * @param {Array<Object>}bullets new bullet array to set old one to
     * @param {Array<Object>}items new item array to set old one to
     */
    update(players, bullets, items) {
        this.players = players.map((player) => new Player(player));
        this.bullets = bullets.map((bullet) => new Bullet(bullet));
        this.items = items.map((item) => new Item(item));
    }

    /**
     * Draws current game state to canvas
     *
     * @param ctx Canvas context
     */
    draw(ctx) {
        const tileSize = ctx.canvas.width / Math.sqrt(this.grid.length);

        for (const tile of this.grid) {
            tile.draw(ctx, tileSize);
        }

        for (const player of this.players) {
            player.draw(ctx, tileSize);
        }

        for (const bullet of this.bullets) {
            bullet.draw(ctx, tileSize);
        }

        for (const item of this.items) {
            item.draw(ctx, tileSize);
        }
    }
}