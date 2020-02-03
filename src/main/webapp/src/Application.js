import Canvas from "./entities/Canvas";
import {attackAction, moveAction} from "./logic/actions";
import {createGame, initLobbies, newUser, send, updateUsers} from "./logic/wsHandler";

export default class Application {
    constructor() {
        this.url = "ws://localhost:8080/arena_shooter/endpoint";
        this.ws = new WebSocket(this.url);
        this.canvas = new Canvas(document.getElementById("canvas"));
        this.moveKeyEnabled = true;
        this.attackKeyEnabled = true;
        this.addListeners();
    }

    addListeners() {
        addEventListener("keydown", (e) => {
            if (this.moveKeyEnabled) {
                this.moveKeyEnabled = false;
                send(this.ws, "move", moveAction(e))
            }
        });
        addEventListener("keyup", () => this.moveKeyEnabled = true);

        addEventListener("keydown", (e) => {
            if (this.attackKeyEnabled) {
                this.attackKeyEnabled = false;
                send(this.ws, "attack", attackAction(e))
            }
        });
        addEventListener("keyup", () => this.attackKeyEnabled = true);

        this.ws.addEventListener("message", e => {
            const data = JSON.parse(e.data);
            console.log(data);
            switch (data.type) {
                case "newUser":
                    newUser(this.ws);
                    break;
                case "game":
                    this.game = createGame(data.game);
                    this.game.draw(this.canvas.ctx);
                    break;
                case "updateUsers":
                    updateUsers(data.users, this.lobbyCount);
                    break;
                case "lobbyCount":
                    this.lobbyCount = data.lobbies;
                    initLobbies(this.ws, data.lobbies);
                    break;
            }
        });
    }
}