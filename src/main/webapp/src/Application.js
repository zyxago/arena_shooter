import Canvas from "./entities/Canvas";
import {attackAction, moveAction} from "./logic/actions";
import {initLobbies, newUser, send, updateUsers} from "./logic/wsHandler";
import Game from "./entities/Game";
import {updateLobbyStates, updateLobbyChat} from "./logic/lobbies";

export default class Application {
    /**
     * Main application
     */
    constructor() {
        this.url = `ws://${location.host}/arena_shooter/endpoint`;
        this.ws = new WebSocket(this.url);
        this.canvas = new Canvas(document.getElementById("canvas"));
        this.moveCooldown = 100;
        this.attackCooldown = 100;
        this.lastMoveTime = new Date();
        this.lastAttackTime = new Date();
        this.moveListener = this.moveListener.bind(this);
        this.attackListener = this.attackListener.bind(this);
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
                    updateLobbyStates(data.users, this.lobbyCount, this.userPlayerNr);
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
                    break;
                case "updateChat":
                    updateLobbyChat(data);
                    break;
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
        addEventListener("keydown", this.attackListener);
    }

    moveListener(e) {
        if (this.lastMoveTime.getTime() + this.moveCooldown <= new Date().getTime()) {
            this.lastMoveTime = new Date();
            send(this.ws, "move", moveAction(e))
        }
    }

    attackListener(e) {
        if (this.lastAttackTime.getTime() + this.attackCooldown <= new Date().getTime()) {
            this.lastAttackTime = new Date();
            send(this.ws, "attack", attackAction(e))
        }
    }

    removeGameListeners() {
        removeEventListener("keydown", this.moveListener);
        removeEventListener("keydown", this.attackListener);
    }

    destroyGame() {
        this.removeGameListeners();
        this.game = undefined;
        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
    }
}