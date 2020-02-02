export default class Game{
    constructor({grid, players, bullets, items}) {
        this.grid = grid;
        this.players = players;
        this.bullets = bullets;
        this.items = items
    }

    /**
     * Draws current game state to canvas
     * @param ctx Canvas context
     */
    draw(ctx){
        //Draw tiles
        const size = ctx.canvas.width/Math.sqrt(this.grid.length);
        for(const tile of this.grid) {
            if (!tile.solid) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "brown";
            }
            ctx.fillRect(tile.x * size, tile.y * size, size, size);
            ctx.strokeRect(tile.x * size, tile.y * size, size, size);

            ctx.fillStyle = "black";
            ctx.fillText(`x:[${tile.x}] y:[${tile.y}]`, tile.x * size + 2, tile.y * size + 10);
        }
        //Draw players
        for(const player of this.players){
            ctx.fillStyle = player.color;
            ctx.fillRect(player.point.x * size, player.point.y * size, size, size);
        }
    }
}