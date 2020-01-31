export default class Map{
    constructor(gridArray) {
        this.gridArray = gridArray;
    }

    draw(ctx){
        let iterationX = 0;
        let iterationY = 0;
        for(const row of this.gridArray){
            for(const tile of row){
                ctx.fillRect(iterationX*10, iterationY*10, 8, 8);
                iterationX++;
            }
            iterationY++;
        }
    }
}