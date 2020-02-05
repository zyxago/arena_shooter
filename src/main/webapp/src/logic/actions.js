/**
 *
 * @param {Event}e
 * @returns {string}
 */
export function moveAction(e) {
    const key = e.key;
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
 *
 * @param {Event}e
 * @returns {string}
 */
export function attackAction(e) {
    const key = e.key;
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