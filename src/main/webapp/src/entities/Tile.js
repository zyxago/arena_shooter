import Point from "./Point";

export default class Tile{
    /**
     *
     * @param {Point}point
     * @param {boolean}solid
     * @param {boolean}spawns
     */
    constructor({point, solid, spawns}) {
        this.point = new Point(point);
        this.solid = solid;
        this.spawns = spawns;
    }

    /**
     * Draws tile onto a canvas
     *
     * @param ctx Canvas Context
     * @param {number}tileSize Size of a grid tile
     */
    draw(ctx, tileSize){
        if (!this.solid) {
            if (this.spawns) {
                ctx.fillStyle = "rgb(134,229,88)"
            } else {
                ctx.fillStyle = "white";
            }
        } else {
            ctx.fillStyle = "rgb(41,41,41)";
        }
        ctx.fillRect(this.point.x * tileSize, this.point.y * tileSize, tileSize, tileSize);
        ctx.strokeRect(this.point.x * tileSize, this.point.y * tileSize, tileSize, tileSize);
    }
}