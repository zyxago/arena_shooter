import Canvas from "./entities/Canvas";
import {attackAction, moveAction} from "./logic/actions";
import {createGame, initLobbies, newUser, send, updateUsers} from "./logic/wsHandler";
import Game from "./entities/Game";

export default class Application {
    constructor() {
        this.url = "ws://10.16.58.160:8080/arena_shooter/endpoint";
        this.ws = new WebSocket(this.url);
        this.canvas = new Canvas(document.getElementById("canvas"));
        this.moveKeyEnabled = true;
        this.attackKeyEnabled = true;
        this.addGameListeners();
        this.ws.addEventListener("message", e => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "newUser":
                    newUser(this.ws);
                    break;
                case "game":
                    this.game = new Game(data.game);
                    this.game.draw(this.canvas.ctx);
                    break;
                case "updateUsers":
                    updateUsers(data.users, this.lobbyCount);
                    break;
                case "lobbyCount":
                    this.lobbyCount = data.lobbies;
                    initLobbies(this.ws, data.lobbies);
                    break;
                case "win":
                    this.destroyGame();
                    alert("VICTORY!");
                    break;
                case "lost":
                    this.destroyGame();
                    alert("DEFEAT!");
                    break;
                case "gameState":
                    this.game.update(data.players, data.bullets, data.items);
                    this.game.draw(this.canvas.ctx);
            }
        });
    }

    addGameListeners() {
        addEventListener("keydown", this.moveListener.bind(this));
        addEventListener("keyup", this.enableMoveListener.bind(this));

        addEventListener("keydown", this.attackListener.bind(this));
        addEventListener("keyup", this.enableAttackListener.bind(this));
    }

    moveListener(e){
        if (this.moveKeyEnabled) {
            this.moveKeyEnabled = false;
            send(this.ws, "move", moveAction(e))
        }
    }

    enableMoveListener(){
        this.moveKeyEnabled = true
    }

    attackListener(e){
        if (this.attackKeyEnabled) {
            this.attackKeyEnabled = false;
            send(this.ws, "attack", attackAction(e))
        }
    }

    enableAttackListener(){
        this.attackKeyEnabled = true
    }

    removeGameListeners(){
        removeEventListener("keydown", this.moveListener);
        removeEventListener("keydown", this.attackListener);
        removeEventListener("keyup", this.enableMoveListener);
        removeEventListener("keyup", this.enableAttackListener);
    }

    destroyGame(){
        this.removeGameListeners();
        this.game = undefined;
        this.attackKeyEnabled = true;
        this.moveKeyEnabled = true;
        this.canvas.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height);
    }
}