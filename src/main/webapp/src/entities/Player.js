import {createDrop} from "../logic/canvasObjects";

export default class Player {
    /**
     *
     * @param {string}color
     * @param {Number}lobby
     * @param {Number}hp
     * @param {Number}maxHp
     * @param {Point}point
     * @param {Number}playerNr
     * @param {String}name
     */
    constructor({color, lobby, hp, maxHp, point, playerNr, name}) {
        this.name = name;
        this.color = color;
        this.lobby = lobby;
        this.hp = hp;
        this.maxHp = maxHp;
        this.point = point;
    }

    /**
     * Draws player onto a canvas
     *
     * @param ctx Canvas Context
     * @param {number}tileSize Size of a grid tile
     */
    draw(ctx, tileSize) {
        const offset = tileSize / 4;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.point.x * tileSize + offset / 2, this.point.y * tileSize + offset / 2, tileSize - offset, tileSize - offset);
        ctx.strokeRect(this.point.x * tileSize + offset / 2, this.point.y * tileSize + offset / 2, tileSize - offset, tileSize - offset);
        for (let i = 0; i < this.maxHp; i++) {
            let fill = "rgb(255,27,52)";
            if (!(this.hp > i)) {
                fill = false;
            }
            createDrop(this.point.x * tileSize + tileSize / this.maxHp * i, this.point.y * tileSize - tileSize / 2, .5, fill, ctx);
        }
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.font = `${offset*1.5}px Arial`;
        ctx.fillText(this.name, this.point.x * tileSize + offset / 2, (this.point.y * tileSize + offset / 2) + tileSize);
    }
}