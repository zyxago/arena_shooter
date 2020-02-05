import Point from "./Point";

export default class Bullet{
    constructor({point, color}) {
        this.point = new Point(point);
        this.color = color;
    }

    /**
     *
     * @param ctx
     * @param size
     */
    draw(ctx, size){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.point.x * size + size/2, this.point.y * size + size/2, size*0.2, size*0.2, 0, 0, Math.PI*2, false);
        ctx.fill();
        ctx.stroke();
    }
}