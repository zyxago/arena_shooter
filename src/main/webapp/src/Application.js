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
        this.keysPressed = {};
        this.moveCooldown = 100;
        this.attackCooldown = 100;
        this.lastMoveTime = new Date();
        this.lastAttackTime = new Date();
        this.keydownListener = this.keydownListener.bind(this);
        this.keyupListener = this.keyupListener.bind(this);
        this.ws.addEventListener("message", e => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "newUser":
                    newUser(this.ws);
                    this.userPlayerNr = data.playerNr;
                    break;
                case "game":
                    this.destroyGame();
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
                    alert("VICTORY!");
                    break;
                case "lost":
                    alert("DEFEAT!");
                    break;
                case "gameState":
                    if(this.game !== undefined){
                        this.game.update(data.players, data.bullets, data.items);
                        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
                        this.game.draw(this.canvas.ctx);
                    }
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
        addEventListener("keydown", this.keydownListener);
        addEventListener("keyup", this.keyupListener);
    }

    keydownListener(e){
        this.keysPressed[e.key] = true;

        this.move(e.key);
        this.attack(e.key);
    }

    keyupListener(e){
        delete this.keysPressed[e.key];
    }

    move(key) {
        if (this.lastMoveTime.getTime() + this.moveCooldown <= new Date().getTime()) {
            this.lastMoveTime = new Date();
            send(this.ws, "move", moveAction(key))
        }
    }

    attack(key) {
        if (this.lastAttackTime.getTime() + this.attackCooldown <= new Date().getTime()) {
            this.lastAttackTime = new Date();
            send(this.ws, "attack", attackAction(key))
        }
    }

    removeGameListeners() {
        removeEventListener("keydown", this.keydownListener);
        removeEventListener("keydown", this.keyupListener);
    }

    destroyGame() {
        this.removeGameListeners();
        this.game = undefined;
        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
    }
}