/**
 * Draws a drop-shaped object onto specified canvas
 *
 * @param {number}x
 * @param {number}y
 * @param {number}scale Scaling value, for default enter 1
 * @param {string}fill fill style of drop, false if no fill
 * @param ctx Canvas context
 */
export function createDrop(x, y, scale, fill, ctx) {
    const baseX = -35 / 2 * scale;
    const baseY = 35;
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
        ctx.fillStyle = fill;
        ctx.fill();
    }
    ctx.stroke();
}