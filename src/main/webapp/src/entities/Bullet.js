import Point from "./Point";

export default class Bullet{
    /**
     *
     * @param {Point}point
     * @param {string}color
     */
    constructor({point, color}) {
        this.point = new Point(point);
        this.color = color;
    }

    /**
     * Draws bullet onto a canvas
     *
     * @param ctx Canvas Context
     * @param {number}tileSize Size of a grid tile
     */
    draw(ctx, tileSize){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.point.x * tileSize + tileSize/2, this.point.y * tileSize + tileSize/2, tileSize*0.2, tileSize*0.2, 0, 0, Math.PI*2, false);
        ctx.fill();
        ctx.stroke();
    }
}