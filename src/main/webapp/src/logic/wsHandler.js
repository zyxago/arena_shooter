import {createLobbies} from "./lobbies";

/**
 * Creates lobbies in DOM
 *
 * @param {WebSocket}ws
 * @param {number}lobbyCount Amount of lobbies to be generated
 */
export function initLobbies(ws, lobbyCount) {
    createLobbies(lobbyCount);
    for (let i = 0; i < lobbyCount; i++) {
        document.getElementById(`join:${i}`).addEventListener("click", () => joinLobby(ws, i));
        document.getElementById(`start:${i}`).addEventListener("click", () => startGame(ws));
    }
}

/**
 * Updates lobby lists and users online list
 *
 * @param {Array<Object>}users Current state of users
 * @param {number}lobbyCount
 */
export function updateUsers(users, lobbyCount) {
    //Reset textareas
    document.getElementById("users").value = "";
    for (let i = 0; i < lobbyCount; i++) {
        document.getElementById(`lobby:${i}`).value = "";
    }
    //Insert new values
    for (const user of users) {
        const output = `${user.username}\n`;
        document.getElementById("users").value += output;
        if (user.lobby) {
            document.getElementById(`lobby:${user.lobby}`).value += output;
        }
    }
}

//=======================================
//Send messages
//=======================================

/**
 * Sends join lobby request to ws
 *
 * @param {WebSocket}ws
 * @param {number}id Id of lobby to join
 */
export function joinLobby(ws,id) {
    send(ws,"join", id);
}

/**
 * Sends start command to ws
 *
 * @param {WebSocket}ws
 */
export function startGame(ws) {
    send(ws,"start", "");
}

/**
 * Asks user for username and sends it to ws
 *
 * @param {WebSocket}ws
 */
export function newUser(ws) {
    let name = prompt("Enter your player name: ", "");
    if (name === "" || name === null) {
        name = "RandomGuy#" + Math.floor(Math.random() * 10000);
    }
    send(ws,"name", name);
}

/**
 * Sends a message to the Websocket server
 *
 * @param {WebSocket}ws
 * @param {string}type Type of message
 * @param {string}msg Message
 */
export function send(ws, type, msg) {
    ws.send(`${type}:${msg}`);
}