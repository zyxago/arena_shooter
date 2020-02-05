export default class Player {
    constructor({name, color, lobby, hp, maxHp, point}) {
        this.name = name;
        this.color = color;
        this.lobby = lobby;
        this.hp = hp;
        this.maxHp = maxHp;
        this.point = point;
    }

    draw(ctx, size) {
        const offset = size / 4;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.point.x * size + offset / 2, this.point.y * size + offset / 2, size - offset, size - offset);

        for (let i = 0; i < this.maxHp; i++) {
            let fill = true;
            if (!(this.hp > i)) {
                fill = false;
            }
            this.createDrop(this.point.x * size + size / 3 * i, this.point.y * size - size / 2, .5, fill, ctx);
        }
    }

    createDrop(x, y, scale, fill, ctx) {
        const baseX = -35 / 2 * scale;
        const baseY = 35;
        ctx.fillStyle = "rgb(154,5,10)";
        ctx.beginPath();
        ctx.arc(
            x + baseX + ((35 * 2) * scale),
            y + baseY * scale,
            50 * scale,
            Math.PI,
            Math.PI * 1.24,
            false);
        ctx.arc(
            x + baseX,
            y + baseY * scale,
            50 * scale,
            Math.PI * 1.747,
            0,
            false);
        ctx.arc(
            x + baseX + (35 * scale),
            y - 1 + baseY * scale,
            15 * scale,
            0, Math.PI,
            false);
        if (fill) {
            ctx.fill();
        }
        ctx.stroke();
    }

}