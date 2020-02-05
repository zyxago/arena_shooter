import Point from "./Point";

export default class Item{
    constructor({point, item}) {
        this.point = new Point(point);
        this.item = item;
    }

    draw(ctx, size){
        const offset = size*0.6;
        ctx.fillStyle = "black";
        if(this.item === "heal"){
            ctx.fillStyle = "rgb(154,5,10)";
        } else if(this.item === "attack"){
            ctx.fillStyle = "rgb(154,20,132)";
        }
        ctx.fillRect(this.point.x * size + offset/2, this.point.y * size + offset/2, size - offset, size - offset);
    }
}