export default class Map{
    constructor({grid}) {
        this.grid = grid;
    }

    draw(ctx){
        const size = ctx.canvas.width/16;
        for(let y = 0; y < this.grid.length; y++){
            for(let x = 0; x < this.grid[y].length; x++){
                if(!this.grid[y][x].solid){
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
    }
}