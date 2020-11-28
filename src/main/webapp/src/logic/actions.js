/**
 * Checks key press and returns a direction in form of "x,y"
 *
 * @returns {String} players move direction formatted as string
 */
export function moveAction(key) {
    let dirX = 0;
    let dirY = 0;
    switch (key) {
        case "w" || "W":
            dirY = -1;
            break;
        case "s" || "S":
            dirY = 1;
            break;
        case "a" || "A":
            dirX = -1;
            break;
        case "d" || "D":
            dirX = 1;
            break;
    }
    if (dirX || dirY) {
        return `${dirX},${dirY}`
    }
    return "";
}

/**
 * Checks key press and returns a direction in form of "x,y"
 *
 * @returns {string} players attack direction formatted as string
 */
export function attackAction(key) {
    let dirX = 0;
    let dirY = 0;
    switch (key) {
        case"ArrowUp":
            dirY = -1;
            break;
        case"ArrowDown":
            dirY = 1;
            break;
        case"ArrowLeft":
            dirX = -1;
            break;
        case"ArrowRight":
            dirX = 1;
            break;
    }
    if (dirX || dirY) {
        return `${dirX},${dirY}`
    }
    return "";
}