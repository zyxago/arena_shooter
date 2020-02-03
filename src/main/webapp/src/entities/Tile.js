import Point from "./Point";

export default class Tile{
    constructor({point, solid, spawns}) {
        this.point = new Point(point);
        this.solid = solid;
        this.spawns = spawns;
    }
}