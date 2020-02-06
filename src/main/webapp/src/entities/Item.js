import Point from "./Point";
import {createDrop} from "../logic/canvasObjects";

export default class Item {
    /**
     *
     * @param {Point}point
     * @param {string}item
     */
    constructor({point, item}) {
        this.point = new Point(point);
        this.item = item;
    }

    /**
     * Draws item onto a canvas
     *
     * @param ctx Canvas Context
     * @param {number}tileSize Size of a grid tile
     */
    draw(ctx, tileSize) {
        const offset = tileSize * 0.6;
        ctx.fillStyle = "black";
        if (this.item === "heal") {
            createDrop(this.point.x * tileSize + tileSize / 4, this.point.y * tileSize + tileSize / 4, .7, "rgb(255,27,52)", ctx);
        } else if (this.item === "attack") {
            ctx.fillStyle = "rgb(154,20,132)";
            ctx.fillRect(this.point.x * tileSize + offset / 2, this.point.y * tileSize + offset / 2, tileSize - offset, tileSize - offset);
        }

    }
}