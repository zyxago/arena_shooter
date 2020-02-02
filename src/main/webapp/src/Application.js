import {createLobbies} from "./logic/lobbies";
import Player from "./entities/Player";
import Canvas from "./entities/Canvas";
import Game from "./entities/Game";
import {moveAction} from "./logic/action";

export default class Application {
    constructor() {
        this.canvas = new Canvas(document.getElementById("canvas"));
        this.url = "ws://localhost:8080/arena_shooter/endpoint";
        this.ws = new WebSocket(this.url);
        this.users = [];
        this.keyPressEnabled = true;
        this.ws.addEventListener("message", e => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "newUser":
                    this.newUser();
                    break;
                case "game":
                    this.createGame(data.game);
                    break;
                case "updateUsers":
                    this.updateUsers(data.users);
                    break;
                case "lobbyCount":
                    this.initLobbies(data.lobbies);
                    break;
            }
        });
        this.initPlayerControlls();
    }

    initPlayerControlls() {
        addEventListener("keydown", (e) => {
            if (this.keyPressEnabled) {
                this.keyPressEnabled = false;
                this.send("move", moveAction(e))
            }
        });
        addEventListener("keyup", () => this.keyPressEnabled = true);
        //add event listener for attack
    }

    /**
     *
     * @param {int}lobbyCount Amount of lobbies to be generated
     */
    initLobbies(lobbyCount) {
        this.lobbyCount = lobbyCount;
        createLobbies(this.lobbyCount);
        for (let i = 0; i < this.lobbyCount; i++) {
            document.getElementById(`join:${i}`).addEventListener("click", () => this.joinLobby(i));
            document.getElementById(`start:${i}`).addEventListener("click", () => this.startGame());
        }
    }

    /**
     *
     * @param {int}id Id of lobby to join
     */
    joinLobby(id) {
        this.send("join", id);
    }

    startGame() {
        this.send("start", "");
    }

    /**
     * Sends a message to the Websocket server
     * @param type Type of message
     * @param msg Message
     */
    send(type, msg) {
        //msg to send:
        //Move player:  "move"
        //Attack with player: "attack"
        //Join game lobby: "join"
        //Start game: "start"
        //Pick player color: "color"
        //player name: "name"
        this.ws.send(`${type}:${msg}`);
    }

    /**
     * Creates a Game obj from json
     * @param game Json to create obj from
     */
    createGame(game) {
        if (this.game == undefined) {
            requestAnimationFrame(() => this.draw());
        }
        this.game = new Game(game);
    }

    newUser() {
        let name = prompt("Enter your player name: ", "");
        if (name === "" || name === null) {
            name = "RandomGuy#" + Math.floor(Math.random() * 10000);
        }
        this.send("name", name);
    }

    /**
     * Updates lobby lists and users online list
     * @param users Current state of users
     */
    updateUsers(users) {
        document.getElementById("users").value = "";
        for (let i = 0; i < this.lobbyCount; i++) {
            document.getElementById(`lobby:${i}`).value = "";
        }
        for (const user of users) {
            if (!this.users.filter((oldUser) => oldUser.id == user.id)) {
                this.users.push(new Player(user));
            }
            const output = `${user.username}\n`;
            document.getElementById("users").value += output;
            if (user.lobby) {
                document.getElementById(`lobby:${user.lobby}`).value += output;
            }
        }
    }

    draw() {
        this.game.draw(this.canvas.ctx);
        requestAnimationFrame(() => this.draw());
    }
}