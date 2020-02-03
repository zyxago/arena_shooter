export default class Player{
    constructor({name, color, lobby, hp, maxHp, point}) {
        this.name = name;
        this.color = color;
        this.lobby = lobby;
        this.hp = hp;
        this.maxHp = maxHp;
        this.point = point;
    }

    draw(ctx, size){
        const offset = size/4;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.point.x * size + offset/2, this.point.y * size + offset/2, size - offset, size - offset);
    }
}