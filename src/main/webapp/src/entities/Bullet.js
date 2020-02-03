import Point from "./Point";

export default class Bullet{
    constructor({point, color}) {
        this.point = new Point(point);
        this.color = color;
    }

    draw(ctx, size){
        const offset = size/2;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.point.x * size + offset/2, this.point.y * size + offset/2, size - offset, size - offset);
    }
}