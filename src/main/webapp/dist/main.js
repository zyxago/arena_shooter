/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Application.js":
/*!****************************!*\
  !*** ./src/Application.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Application; });\n/* harmony import */ var _logic_lobbies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/lobbies */ \"./src/logic/lobbies.js\");\n/* harmony import */ var _entities_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/Player */ \"./src/entities/Player.js\");\n/* harmony import */ var _entities_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/Canvas */ \"./src/entities/Canvas.js\");\n/* harmony import */ var _entities_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/Game */ \"./src/entities/Game.js\");\n/* harmony import */ var _logic_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logic/action */ \"./src/logic/action.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Application {\r\n    constructor() {\r\n        this.canvas = new _entities_Canvas__WEBPACK_IMPORTED_MODULE_2__[\"default\"](document.getElementById(\"canvas\"));\r\n        this.url = \"ws://localhost:8080/arena_shooter/endpoint\";\r\n        this.ws = new WebSocket(this.url);\r\n        this.users = [];\r\n        this.keyPressEnabled = true;\r\n        this.ws.addEventListener(\"message\", e => {\r\n            const data = JSON.parse(e.data);\r\n            switch (data.type) {\r\n                case \"newUser\":\r\n                    this.newUser();\r\n                    break;\r\n                case \"game\":\r\n                    this.createGame(data.game);\r\n                    break;\r\n                case \"updateUsers\":\r\n                    this.updateUsers(data.users);\r\n                    break;\r\n                case \"lobbyCount\":\r\n                    this.initLobbies(data.lobbies);\r\n                    break;\r\n            }\r\n        });\r\n        this.initPlayerControlls();\r\n    }\r\n\r\n    initPlayerControlls() {\r\n        addEventListener(\"keydown\", (e) => {\r\n            if (this.keyPressEnabled) {\r\n                this.keyPressEnabled = false;\r\n                this.send(\"move\", Object(_logic_action__WEBPACK_IMPORTED_MODULE_4__[\"moveAction\"])(e))\r\n            }\r\n        });\r\n        addEventListener(\"keyup\", () => this.keyPressEnabled = true);\r\n        //add event listener for attack\r\n    }\r\n\r\n    /**\r\n     *\r\n     * @param {int}lobbyCount Amount of lobbies to be generated\r\n     */\r\n    initLobbies(lobbyCount) {\r\n        this.lobbyCount = lobbyCount;\r\n        Object(_logic_lobbies__WEBPACK_IMPORTED_MODULE_0__[\"createLobbies\"])(this.lobbyCount);\r\n        for (let i = 0; i < this.lobbyCount; i++) {\r\n            document.getElementById(`join:${i}`).addEventListener(\"click\", () => this.joinLobby(i));\r\n            document.getElementById(`start:${i}`).addEventListener(\"click\", () => this.startGame());\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * @param {int}id Id of lobby to join\r\n     */\r\n    joinLobby(id) {\r\n        this.send(\"join\", id);\r\n    }\r\n\r\n    startGame() {\r\n        this.send(\"start\", \"\");\r\n    }\r\n\r\n    /**\r\n     * Sends a message to the Websocket server\r\n     * @param type Type of message\r\n     * @param msg Message\r\n     */\r\n    send(type, msg) {\r\n        //msg to send:\r\n        //Move player:  \"move\"\r\n        //Attack with player: \"attack\"\r\n        //Join game lobby: \"join\"\r\n        //Start game: \"start\"\r\n        //Pick player color: \"color\"\r\n        //player name: \"name\"\r\n        this.ws.send(`${type}:${msg}`);\r\n    }\r\n\r\n    /**\r\n     * Creates a Game obj from json\r\n     * @param game Json to create obj from\r\n     */\r\n    createGame(game) {\r\n        if (this.game == undefined) {\r\n            requestAnimationFrame(() => this.draw());\r\n        }\r\n        this.game = new _entities_Game__WEBPACK_IMPORTED_MODULE_3__[\"default\"](game);\r\n    }\r\n\r\n    newUser() {\r\n        let name = prompt(\"Enter your player name: \", \"\");\r\n        if (name === \"\" || name === null) {\r\n            name = \"RandomGuy#\" + Math.floor(Math.random() * 10000);\r\n        }\r\n        this.send(\"name\", name);\r\n    }\r\n\r\n    /**\r\n     * Updates lobby lists and users online list\r\n     * @param users Current state of users\r\n     */\r\n    updateUsers(users) {\r\n        document.getElementById(\"users\").value = \"\";\r\n        for (let i = 0; i < this.lobbyCount; i++) {\r\n            document.getElementById(`lobby:${i}`).value = \"\";\r\n        }\r\n        for (const user of users) {\r\n            if (!this.users.filter((oldUser) => oldUser.id == user.id)) {\r\n                this.users.push(new _entities_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](user));\r\n            }\r\n            const output = `${user.username}\\n`;\r\n            document.getElementById(\"users\").value += output;\r\n            if (user.lobby) {\r\n                document.getElementById(`lobby:${user.lobby}`).value += output;\r\n            }\r\n        }\r\n    }\r\n\r\n    draw() {\r\n        this.game.draw(this.canvas.ctx);\r\n        requestAnimationFrame(() => this.draw());\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/Application.js?");

/***/ }),

/***/ "./src/entities/Canvas.js":
/*!********************************!*\
  !*** ./src/entities/Canvas.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas{\r\n    constructor(element) {\r\n        this.canvas = element;\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n\r\n        this.canvas.width = window.innerWidth/2;\r\n        this.canvas.height = window.innerWidth/2;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Canvas.js?");

/***/ }),

/***/ "./src/entities/Game.js":
/*!******************************!*\
  !*** ./src/entities/Game.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\nclass Game{\r\n    constructor({grid, players, bullets, items}) {\r\n        this.grid = grid;\r\n        this.players = players;\r\n        this.bullets = bullets;\r\n        this.items = items\r\n    }\r\n\r\n    /**\r\n     * Draws current game state to canvas\r\n     * @param ctx Canvas context\r\n     */\r\n    draw(ctx){\r\n        //Draw tiles\r\n        const size = ctx.canvas.width/Math.sqrt(this.grid.length);\r\n        for(const tile of this.grid) {\r\n            if (!tile.solid) {\r\n                ctx.fillStyle = \"white\";\r\n            } else {\r\n                ctx.fillStyle = \"brown\";\r\n            }\r\n            ctx.fillRect(tile.x * size, tile.y * size, size, size);\r\n            ctx.strokeRect(tile.x * size, tile.y * size, size, size);\r\n\r\n            ctx.fillStyle = \"black\";\r\n            ctx.fillText(`x:[${tile.x}] y:[${tile.y}]`, tile.x * size + 2, tile.y * size + 10);\r\n        }\r\n        //Draw players\r\n        for(const player of this.players){\r\n            ctx.fillStyle = player.color;\r\n            ctx.fillRect(player.point.x * size, player.point.y * size, size, size);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Game.js?");

/***/ }),

/***/ "./src/entities/Player.js":
/*!********************************!*\
  !*** ./src/entities/Player.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nclass Player{\r\n    //Ta bort kanske?\r\n    constructor({name, color, lobby}) {\r\n        this.name = name;\r\n        this.color = color;\r\n        this.lobby = lobby;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application */ \"./src/Application.js\");\n\r\n\r\nconst app = new _Application__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/logic/action.js":
/*!*****************************!*\
  !*** ./src/logic/action.js ***!
  \*****************************/
/*! exports provided: moveAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveAction\", function() { return moveAction; });\n/**\r\n *\r\n * @param e\r\n * @returns {string}\r\n */\r\nfunction moveAction(e) {\r\n    console.log(\"KEY PRESSED: \" + e.key);\r\n    const key = e.key;\r\n    let dirX = 0;\r\n    let dirY = 0;\r\n    if (key === \"w\" || key === \"W\") {\r\n        dirY = -1;\r\n    } else if (key === \"s\" || key === \"S\") {\r\n        dirY = 1;\r\n    }\r\n    else if (key === \"a\" || key === \"A\") {\r\n        dirX = -1;\r\n    } else if (key === \"d\" || key === \"D\") {\r\n        dirX = 1;\r\n    }\r\n    if(dirX || dirY){\r\n        return `${dirX}:${dirY}`\r\n    }\r\n    return \"\";\r\n}\n\n//# sourceURL=webpack:///./src/logic/action.js?");

/***/ }),

/***/ "./src/logic/lobbies.js":
/*!******************************!*\
  !*** ./src/logic/lobbies.js ***!
  \******************************/
/*! exports provided: createLobbies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createLobbies\", function() { return createLobbies; });\n/**\r\n * Creates DOM lobbies\r\n * @param amount Amount of lobbies to create\r\n */\r\nfunction createLobbies(amount){\r\n    const parent = document.getElementById(\"lobbies\");\r\n    for(let i = 0; i < amount; i++){\r\n        const lobby = document.createElement(\"div\");\r\n        const label = document.createElement(\"label\");\r\n        const textarea = document.createElement(\"textarea\");\r\n        const buttonJoin = document.createElement(\"button\");\r\n        const buttonStart = document.createElement(\"button\");\r\n\r\n        lobby.className = \"column\";\r\n\r\n        label.className = \"label\";\r\n        label.htmlFor = `lobby:${i}`;\r\n        label.innerHTML = `lobby:${i}`;\r\n\r\n        textarea.id = `lobby:${i}`;\r\n        textarea.readOnly = true;\r\n        textarea.cols = 18;\r\n        textarea.rows = 8;\r\n\r\n        buttonJoin.className = \"button\";\r\n        buttonJoin.id = `join:${i}`;\r\n        buttonJoin.innerHTML = \"Join\";\r\n\r\n        buttonStart.className = \"button\";\r\n        buttonStart.id = `start:${i}`;\r\n        buttonStart.innerHTML = \"Start\";\r\n\r\n        lobby.append(label);\r\n        lobby.append(textarea);\r\n        lobby.append(buttonJoin);\r\n        lobby.append(buttonStart);\r\n\r\n        parent.append(lobby);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/logic/lobbies.js?");

/***/ })

/******/ });