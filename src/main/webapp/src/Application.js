import Canvas from "./entities/Canvas";
import {attackAction, moveAction} from "./logic/actions";
import {initLobbies, newUser, send, updateUsers} from "./logic/wsHandler";
import Game from "./entities/Game";
import {updateLobbyStates} from "./logic/lobbies";

export default class Application {
    /**
     * Main application
     */
    constructor() {
        this.url = "ws://10.16.58.160:8080/arena_shooter/endpoint";
        this.ws = new WebSocket(this.url);
        this.canvas = new Canvas(document.getElementById("canvas"));
        this.moveKeyEnabled = true;
        this.attackKeyEnabled = true;
        this.moveListener = this.moveListener.bind(this);
        this.enableMoveListener = this.enableMoveListener.bind(this);
        this.attackListener = this.attackListener.bind(this);
        this.enableAttackListener = this.enableAttackListener.bind(this);
        this.ws.addEventListener("message", e => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "newUser":
                    newUser(this.ws);
                    this.userPlayerNr = data.playerNr;
                    break;
                case "game":
                    this.game = new Game(data.game);
                    this.game.draw(this.canvas.ctx);
                    this.setColorTheme(data.game.players.filter(player=>player.playerNr == this.userPlayerNr)[0].color);
                    this.addGameListeners();
                    break;
                case "updateUsers":
                    updateUsers(data.users, this.lobbyCount);
                    updateLobbyStates(data.users, this.lobbyCount, this.userPlayerNr);
                    break;
                case "lobbyCount":
                    this.lobbyCount = data.lobbies;
                    initLobbies(this.ws, data.lobbies);
                    break;
                case "won":
                    this.destroyGame();
                    alert("VICTORY!");
                    break;
                case "lost":
                    this.destroyGame();
                    alert("DEFEAT!");
                    break;
                case "gameState":
                    this.game.update(data.players, data.bullets, data.items);
                    this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
                    this.game.draw(this.canvas.ctx);
            }
        });
    }

    /**
     *
     * @param {string}color
     */
    setColorTheme(color){
        this.canvas.canvas.style.borderColor = color;
    }

    addGameListeners() {
        addEventListener("keydown", this.moveListener);
        addEventListener("keyup", this.enableMoveListener);
        addEventListener("keydown", this.attackListener);
        addEventListener("keyup", this.enableAttackListener);
    }

    moveListener(e) {
        if (this.moveKeyEnabled) {
            this.moveKeyEnabled = false;
            send(this.ws, "move", moveAction(e))
        }
    }

    enableMoveListener() {
        this.moveKeyEnabled = true
    }

    attackListener(e) {
        if (this.attackKeyEnabled) {
            this.attackKeyEnabled = false;
            send(this.ws, "attack", attackAction(e))
        }
    }

    enableAttackListener() {
        this.attackKeyEnabled = true
    }

    removeGameListeners() {
        removeEventListener("keydown", this.moveListener);
        removeEventListener("keydown", this.attackListener);
        removeEventListener("keyup", this.enableMoveListener);
        removeEventListener("keyup", this.enableAttackListener);
    }

    destroyGame() {
        this.removeGameListeners();
        this.game = undefined;
        this.attackKeyEnabled = true;
        this.moveKeyEnabled = true;
        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
    }
}