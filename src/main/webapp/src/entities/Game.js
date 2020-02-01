export default class Game{
    constructor({grid, players, bullets, items}) {
        this.grid = grid;
        this.players = players;
        this.bullets = bullets;
        this.items = items
    }

    draw(ctx){
        const size = ctx.canvas.width/this.grid.length;
        for(let y = 0; y < this.grid.length; y++){
            for(let x = 0; x < this.grid[y].length; x++){
                if(!this.grid[y][x].tile.solid){
                    ctx.fillStyle = "white";
                } else{
                    ctx.fillStyle = "brown";
                }
                ctx.fillRect(x*size, y*size, size, size);
                ctx.strokeRect(x*size, y*size, size, size);

                ctx.fillStyle = "black";
                ctx.fillText(`x:[${this.grid[y][x].tile.x}] y:[${this.grid[y][x].tile.y}]`, x*size + 2, y*size + 10);
            }
        }
        for(const player of this.players){
            ctx.fillStyle = player.color;
            ctx.fillRect(player.point.x, player.point.y, size, size);
        }
    }
}