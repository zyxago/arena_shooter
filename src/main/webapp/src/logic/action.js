/**
 *
 * @param e
 * @returns {string}
 */
export function moveAction(e) {
    console.log("KEY PRESSED: " + e.key);
    const key = e.key;
    let dirX = 0;
    let dirY = 0;
    if (key === "w" || key === "W") {
        dirY = -1;
    } else if (key === "s" || key === "S") {
        dirY = 1;
    }
    else if (key === "a" || key === "A") {
        dirX = -1;
    } else if (key === "d" || key === "D") {
        dirX = 1;
    }
    if(dirX || dirY){
        return `${dirX}:${dirY}`
    }
    return "";
}