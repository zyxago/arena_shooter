import {createLobbies} from "./lobbies";

/**
 *
 * @param ws
 * @param {int}lobbyCount Amount of lobbies to be generated
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
 * @param users Current state of users
 * @param lobbyCount
 */
export function updateUsers(users, lobbyCount) {
    //Reset textareas
    document.getElementById("users").value = "";
    for (let i = 0; i < lobbyCount; i++) {
        document.getElementById(`lobby:${i}`).value = "";
    }
    //Insert new values
    for (const user of users) {
        /*if (!this.users.filter((oldUser) => oldUser.id == user.id)) {
            this.users.push(new Player(user));
        }*/
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
 *
 * @param ws
 * @param {int}id Id of lobby to join
 */
export function joinLobby(ws,id) {
    send(ws,"join", id);
}

/**
 *
 * @param ws
 */
export function startGame(ws) {
    send(ws,"start", "");
}

/**
 *
 * @param ws
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
 * @param ws
 * @param type Type of message
 * @param msg Message
 */
export function send(ws, type, msg) {
    //msg to send:
    //Move player:  "move"
    //Attack with player: "attack"
    //Join game lobby: "join"
    //Start game: "start"
    //Pick player color: "color"
    //player name: "name"
    ws.send(`${type}:${msg}`);
}