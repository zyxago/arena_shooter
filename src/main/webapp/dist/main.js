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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Application; });\n/* harmony import */ var _entities_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/Canvas */ \"./src/entities/Canvas.js\");\n/* harmony import */ var _logic_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/actions */ \"./src/logic/actions.js\");\n/* harmony import */ var _logic_wsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logic/wsHandler */ \"./src/logic/wsHandler.js\");\n/* harmony import */ var _entities_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/Game */ \"./src/entities/Game.js\");\n/* harmony import */ var _logic_lobbies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logic/lobbies */ \"./src/logic/lobbies.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Application {\r\n    /**\r\n     * Main application\r\n     */\r\n    constructor() {\r\n        this.url = \"ws://10.16.58.160:8080/arena_shooter/endpoint\";\r\n        this.ws = new WebSocket(this.url);\r\n        this.canvas = new _entities_Canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById(\"canvas\"));\r\n        this.moveKeyEnabled = true;\r\n        this.attackKeyEnabled = true;\r\n        this.moveListener = this.moveListener.bind(this);\r\n        this.enableMoveListener = this.enableMoveListener.bind(this);\r\n        this.attackListener = this.attackListener.bind(this);\r\n        this.enableAttackListener = this.enableAttackListener.bind(this);\r\n        this.ws.addEventListener(\"message\", e => {\r\n            const data = JSON.parse(e.data);\r\n            switch (data.type) {\r\n                case \"newUser\":\r\n                    Object(_logic_wsHandler__WEBPACK_IMPORTED_MODULE_2__[\"newUser\"])(this.ws);\r\n                    this.userPlayerNr = data.playerNr;\r\n                    break;\r\n                case \"game\":\r\n                    this.game = new _entities_Game__WEBPACK_IMPORTED_MODULE_3__[\"default\"](data.game);\r\n                    this.game.draw(this.canvas.ctx);\r\n                    this.setColorTheme(data.game.players.filter(player=>player.playerNr == this.userPlayerNr)[0].color);\r\n                    this.addGameListeners();\r\n                    break;\r\n                case \"updateUsers\":\r\n                    Object(_logic_wsHandler__WEBPACK_IMPORTED_MODULE_2__[\"updateUsers\"])(data.users, this.lobbyCount);\r\n                    Object(_logic_lobbies__WEBPACK_IMPORTED_MODULE_4__[\"updateLobbyStates\"])(data.users, this.lobbyCount, this.userPlayerNr);\r\n                    break;\r\n                case \"lobbyCount\":\r\n                    this.lobbyCount = data.lobbies;\r\n                    Object(_logic_wsHandler__WEBPACK_IMPORTED_MODULE_2__[\"initLobbies\"])(this.ws, data.lobbies);\r\n                    break;\r\n                case \"won\":\r\n                    this.destroyGame();\r\n                    alert(\"VICTORY!\");\r\n                    break;\r\n                case \"lost\":\r\n                    this.destroyGame();\r\n                    alert(\"DEFEAT!\");\r\n                    break;\r\n                case \"gameState\":\r\n                    this.game.update(data.players, data.bullets, data.items);\r\n                    this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);\r\n                    this.game.draw(this.canvas.ctx);\r\n            }\r\n        });\r\n    }\r\n\r\n    /**\r\n     *\r\n     * @param {string}color\r\n     */\r\n    setColorTheme(color){\r\n        this.canvas.canvas.style.borderColor = color;\r\n    }\r\n\r\n    addGameListeners() {\r\n        addEventListener(\"keydown\", this.moveListener);\r\n        addEventListener(\"keyup\", this.enableMoveListener);\r\n        addEventListener(\"keydown\", this.attackListener);\r\n        addEventListener(\"keyup\", this.enableAttackListener);\r\n    }\r\n\r\n    moveListener(e) {\r\n        if (this.moveKeyEnabled) {\r\n            this.moveKeyEnabled = false;\r\n            Object(_logic_wsHandler__WEBPACK_IMPORTED_MODULE_2__[\"send\"])(this.ws, \"move\", Object(_logic_actions__WEBPACK_IMPORTED_MODULE_1__[\"moveAction\"])(e))\r\n        }\r\n    }\r\n\r\n    enableMoveListener() {\r\n        this.moveKeyEnabled = true\r\n    }\r\n\r\n    attackListener(e) {\r\n        if (this.attackKeyEnabled) {\r\n            this.attackKeyEnabled = false;\r\n            Object(_logic_wsHandler__WEBPACK_IMPORTED_MODULE_2__[\"send\"])(this.ws, \"attack\", Object(_logic_actions__WEBPACK_IMPORTED_MODULE_1__[\"attackAction\"])(e))\r\n        }\r\n    }\r\n\r\n    enableAttackListener() {\r\n        this.attackKeyEnabled = true\r\n    }\r\n\r\n    removeGameListeners() {\r\n        removeEventListener(\"keydown\", this.moveListener);\r\n        removeEventListener(\"keydown\", this.attackListener);\r\n        removeEventListener(\"keyup\", this.enableMoveListener);\r\n        removeEventListener(\"keyup\", this.enableAttackListener);\r\n    }\r\n\r\n    destroyGame() {\r\n        this.removeGameListeners();\r\n        this.game = undefined;\r\n        this.attackKeyEnabled = true;\r\n        this.moveKeyEnabled = true;\r\n        this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/Application.js?");

/***/ }),

/***/ "./src/entities/Bullet.js":
/*!********************************!*\
  !*** ./src/entities/Bullet.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bullet; });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/entities/Point.js\");\n\r\n\r\nclass Bullet{\r\n    /**\r\n     *\r\n     * @param {Point}point\r\n     * @param {string}color\r\n     */\r\n    constructor({point, color}) {\r\n        this.point = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](point);\r\n        this.color = color;\r\n    }\r\n\r\n    /**\r\n     * Draws bullet onto a canvas\r\n     *\r\n     * @param ctx Canvas Context\r\n     * @param {number}tileSize Size of a grid tile\r\n     */\r\n    draw(ctx, tileSize){\r\n        ctx.fillStyle = this.color;\r\n        ctx.beginPath();\r\n        ctx.ellipse(this.point.x * tileSize + tileSize/2, this.point.y * tileSize + tileSize/2, tileSize*0.2, tileSize*0.2, 0, 0, Math.PI*2, false);\r\n        ctx.fill();\r\n        ctx.stroke();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Bullet.js?");

/***/ }),

/***/ "./src/entities/Canvas.js":
/*!********************************!*\
  !*** ./src/entities/Canvas.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas{\r\n    /**\r\n     *\r\n     * @param {HTMLElement}element\r\n     */\r\n    constructor(element) {\r\n        this.canvas = element;\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n\r\n        this.canvas.width = window.innerWidth/2 - 100;\r\n        this.canvas.height = window.innerWidth/2 - 100;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Canvas.js?");

/***/ }),

/***/ "./src/entities/Game.js":
/*!******************************!*\
  !*** ./src/entities/Game.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/entities/Player.js\");\n/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tile */ \"./src/entities/Tile.js\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bullet */ \"./src/entities/Bullet.js\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Item */ \"./src/entities/Item.js\");\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n    /**\r\n     *\r\n     * @param {Array<Object>}grid\r\n     * @param {Array<Object>}players\r\n     * @param {Array<Object>}bullets\r\n     * @param {Array<Object>}items\r\n     */\r\n    constructor({grid, players, bullets, items}) {\r\n        this.grid = grid.map((tile) => new _Tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"](tile));\r\n        this.players = players.map((player) => new _Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player));\r\n        this.bullets = bullets.map((bullet) => new _Bullet__WEBPACK_IMPORTED_MODULE_2__[\"default\"](bullet));\r\n        this.items = items.map((item) => new _Item__WEBPACK_IMPORTED_MODULE_3__[\"default\"](item));\r\n    }\r\n\r\n    /**\r\n     * Updates current state of players, bullets and items\r\n     *\r\n     * @param {Array<Object>}players new player array to set old one to\r\n     * @param {Array<Object>}bullets new bullet array to set old one to\r\n     * @param {Array<Object>}items new item array to set old one to\r\n     */\r\n    update(players, bullets, items) {\r\n        this.players = players.map((player) => new _Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player));\r\n        this.bullets = bullets.map((bullet) => new _Bullet__WEBPACK_IMPORTED_MODULE_2__[\"default\"](bullet));\r\n        this.items = items.map((item) => new _Item__WEBPACK_IMPORTED_MODULE_3__[\"default\"](item));\r\n    }\r\n\r\n    /**\r\n     * Draws current game state to canvas\r\n     *\r\n     * @param ctx Canvas context\r\n     */\r\n    draw(ctx) {\r\n        const tileSize = ctx.canvas.width / Math.sqrt(this.grid.length);\r\n\r\n        for (const tile of this.grid) {\r\n            tile.draw(ctx, tileSize);\r\n        }\r\n\r\n        for (const player of this.players) {\r\n            player.draw(ctx, tileSize);\r\n        }\r\n\r\n        for (const bullet of this.bullets) {\r\n            bullet.draw(ctx, tileSize);\r\n        }\r\n\r\n        for (const item of this.items) {\r\n            item.draw(ctx, tileSize);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Game.js?");

/***/ }),

/***/ "./src/entities/Item.js":
/*!******************************!*\
  !*** ./src/entities/Item.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Item; });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/entities/Point.js\");\n/* harmony import */ var _logic_canvasObjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logic/canvasObjects */ \"./src/logic/canvasObjects.js\");\n\r\n\r\n\r\nclass Item {\r\n    /**\r\n     *\r\n     * @param {Point}point\r\n     * @param {string}item\r\n     */\r\n    constructor({point, item}) {\r\n        this.point = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](point);\r\n        this.item = item;\r\n    }\r\n\r\n    /**\r\n     * Draws item onto a canvas\r\n     *\r\n     * @param ctx Canvas Context\r\n     * @param {number}tileSize Size of a grid tile\r\n     */\r\n    draw(ctx, tileSize) {\r\n        const offset = tileSize * 0.6;\r\n        ctx.fillStyle = \"black\";\r\n        if (this.item === \"heal\") {\r\n            Object(_logic_canvasObjects__WEBPACK_IMPORTED_MODULE_1__[\"createDrop\"])(this.point.x * tileSize + tileSize / 4, this.point.y * tileSize + tileSize / 4, .7, \"rgb(255,27,52)\", ctx);\r\n        } else if (this.item === \"attack\") {\r\n            ctx.fillStyle = \"rgb(154,20,132)\";\r\n            ctx.fillRect(this.point.x * tileSize + offset / 2, this.point.y * tileSize + offset / 2, tileSize - offset, tileSize - offset);\r\n        }\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Item.js?");

/***/ }),

/***/ "./src/entities/Player.js":
/*!********************************!*\
  !*** ./src/entities/Player.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _logic_canvasObjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/canvasObjects */ \"./src/logic/canvasObjects.js\");\n\r\n\r\nclass Player {\r\n    /**\r\n     *\r\n     * @param {string}color\r\n     * @param {Number}lobby\r\n     * @param {Number}hp\r\n     * @param {Number}maxHp\r\n     * @param {Point}point\r\n     * @param {Number}playerNr\r\n     */\r\n    constructor({color, lobby, hp, maxHp, point, playerNr}) {\r\n        this.name = name;\r\n        this.color = color;\r\n        this.lobby = lobby;\r\n        this.hp = hp;\r\n        this.maxHp = maxHp;\r\n        this.point = point;\r\n    }\r\n\r\n    /**\r\n     * Draws player onto a canvas\r\n     *\r\n     * @param ctx Canvas Context\r\n     * @param {number}tileSize Size of a grid tile\r\n     */\r\n    draw(ctx, tileSize) {\r\n        const offset = tileSize / 4;\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(this.point.x * tileSize + offset / 2, this.point.y * tileSize + offset / 2, tileSize - offset, tileSize - offset);\r\n        ctx.strokeRect(this.point.x * tileSize + offset / 2, this.point.y * tileSize + offset / 2, tileSize - offset, tileSize - offset);\r\n        for (let i = 0; i < this.maxHp; i++) {\r\n            let fill = \"rgb(255,27,52)\";\r\n            if (!(this.hp > i)) {\r\n                fill = false;\r\n            }\r\n            Object(_logic_canvasObjects__WEBPACK_IMPORTED_MODULE_0__[\"createDrop\"])(this.point.x * tileSize + tileSize / 3 * i, this.point.y * tileSize - tileSize / 2, .5, fill, ctx);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Player.js?");

/***/ }),

/***/ "./src/entities/Point.js":
/*!*******************************!*\
  !*** ./src/entities/Point.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Point; });\nclass Point{\r\n    /**\r\n     *\r\n     * @param {number}x\r\n     * @param {number}y\r\n     */\r\n    constructor({x, y}) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Point.js?");

/***/ }),

/***/ "./src/entities/Tile.js":
/*!******************************!*\
  !*** ./src/entities/Tile.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tile; });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/entities/Point.js\");\n\r\n\r\nclass Tile{\r\n    /**\r\n     *\r\n     * @param {Point}point\r\n     * @param {boolean}solid\r\n     * @param {boolean}spawns\r\n     */\r\n    constructor({point, solid, spawns}) {\r\n        this.point = new _Point__WEBPACK_IMPORTED_MODULE_0__[\"default\"](point);\r\n        this.solid = solid;\r\n        this.spawns = spawns;\r\n    }\r\n\r\n    /**\r\n     * Draws tile onto a canvas\r\n     *\r\n     * @param ctx Canvas Context\r\n     * @param {number}tileSize Size of a grid tile\r\n     */\r\n    draw(ctx, tileSize){\r\n        if (!this.solid) {\r\n            if (this.spawns) {\r\n                ctx.fillStyle = \"rgb(134,229,88)\"\r\n            } else {\r\n                ctx.fillStyle = \"white\";\r\n            }\r\n        } else {\r\n            ctx.fillStyle = \"rgb(41,41,41)\";\r\n        }\r\n        ctx.fillRect(this.point.x * tileSize, this.point.y * tileSize, tileSize, tileSize);\r\n        ctx.strokeRect(this.point.x * tileSize, this.point.y * tileSize, tileSize, tileSize);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Tile.js?");

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

/***/ "./src/logic/actions.js":
/*!******************************!*\
  !*** ./src/logic/actions.js ***!
  \******************************/
/*! exports provided: moveAction, attackAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveAction\", function() { return moveAction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"attackAction\", function() { return attackAction; });\n/**\r\n * Checks key press and returns a direction in form of \"x,y\"\r\n *\r\n * @param {Event}e Keyboard Event\r\n * @returns {String} players move direction formatted as string\r\n */\r\nfunction moveAction(e) {\r\n    const key = e.key;\r\n    let dirX = 0;\r\n    let dirY = 0;\r\n    switch (key) {\r\n        case \"w\" || false:\r\n            dirY = -1;\r\n            break;\r\n        case \"s\" || false:\r\n            dirY = 1;\r\n            break;\r\n        case \"a\" || false:\r\n            dirX = -1;\r\n            break;\r\n        case \"d\" || false:\r\n            dirX = 1;\r\n            break;\r\n    }\r\n    if (dirX || dirY) {\r\n        return `${dirX},${dirY}`\r\n    }\r\n    return \"\";\r\n}\r\n\r\n/**\r\n * Checks key press and returns a direction in form of \"x,y\"\r\n *\r\n * @param {Event}e Keyboard Event\r\n * @returns {string} players attack direction formatted as string\r\n */\r\nfunction attackAction(e) {\r\n    const key = e.key;\r\n    let dirX = 0;\r\n    let dirY = 0;\r\n    switch (key) {\r\n        case\"ArrowUp\":\r\n            dirY = -1;\r\n            break;\r\n        case\"ArrowDown\":\r\n            dirY = 1;\r\n            break;\r\n        case\"ArrowLeft\":\r\n            dirX = -1;\r\n            break;\r\n        case\"ArrowRight\":\r\n            dirX = 1;\r\n            break;\r\n    }\r\n    if (dirX || dirY) {\r\n        return `${dirX},${dirY}`\r\n    }\r\n    return \"\";\r\n}\n\n//# sourceURL=webpack:///./src/logic/actions.js?");

/***/ }),

/***/ "./src/logic/canvasObjects.js":
/*!************************************!*\
  !*** ./src/logic/canvasObjects.js ***!
  \************************************/
/*! exports provided: createDrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createDrop\", function() { return createDrop; });\n/**\r\n * Draws a drop-shaped object onto specified canvas\r\n *\r\n * @param {number}x\r\n * @param {number}y\r\n * @param {number}scale Scaling value, for default enter 1\r\n * @param {string}fill fill style of drop, false if no fill\r\n * @param ctx Canvas context\r\n */\r\nfunction createDrop(x, y, scale, fill, ctx) {\r\n    const baseX = -35 / 2 * scale;\r\n    const baseY = 35;\r\n    ctx.beginPath();\r\n    ctx.arc(\r\n        x + baseX + ((35 * 2) * scale),\r\n        y + baseY * scale,\r\n        50 * scale,\r\n        Math.PI,\r\n        Math.PI * 1.24,\r\n        false);\r\n    ctx.arc(\r\n        x + baseX,\r\n        y + baseY * scale,\r\n        50 * scale,\r\n        Math.PI * 1.747,\r\n        0,\r\n        false);\r\n    ctx.arc(\r\n        x + baseX + (35 * scale),\r\n        y - 1 + baseY * scale,\r\n        15 * scale,\r\n        0, Math.PI,\r\n        false);\r\n    if (fill) {\r\n        ctx.fillStyle = fill;\r\n        ctx.fill();\r\n    }\r\n    ctx.stroke();\r\n}\n\n//# sourceURL=webpack:///./src/logic/canvasObjects.js?");

/***/ }),

/***/ "./src/logic/lobbies.js":
/*!******************************!*\
  !*** ./src/logic/lobbies.js ***!
  \******************************/
/*! exports provided: createLobbies, updateLobbyStates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createLobbies\", function() { return createLobbies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateLobbyStates\", function() { return updateLobbyStates; });\n/**\r\n * Creates DOM lobbies\r\n *\r\n * @param {number}amount Amount of lobbies to create\r\n */\r\nfunction createLobbies(amount) {\r\n    const parent = document.getElementById(\"lobbies\");\r\n    for (let i = 0; i < amount; i++) {\r\n        const lobby = document.createElement(\"div\");\r\n        const label = document.createElement(\"label\");\r\n        const textarea = document.createElement(\"textarea\");\r\n        const buttonJoin = document.createElement(\"button\");\r\n        const buttonStart = document.createElement(\"button\");\r\n\r\n        lobby.className = \"column\";\r\n\r\n        label.className = \"label\";\r\n        label.htmlFor = `lobby:${i}`;\r\n        label.innerHTML = `lobby:${i}`;\r\n\r\n        textarea.id = `lobby:${i}`;\r\n        textarea.readOnly = true;\r\n        textarea.cols = 18;\r\n        textarea.rows = 8;\r\n\r\n        buttonJoin.className = \"button\";\r\n        buttonJoin.id = `join:${i}`;\r\n        buttonJoin.innerHTML = \"Join\";\r\n\r\n        buttonStart.className = \"button\";\r\n        buttonStart.id = `start:${i}`;\r\n        buttonStart.innerHTML = \"Start\";\r\n\r\n        lobby.append(label);\r\n        lobby.append(textarea);\r\n        lobby.append(buttonJoin);\r\n        lobby.append(buttonStart);\r\n\r\n        parent.append(lobby);\r\n    }\r\n}\r\n\r\n/**\r\n *\r\n * @param {Array<Object>}users\r\n * @param {number}lobbyCount\r\n * @param {number}playerNr\r\n */\r\nfunction updateLobbyStates(users, lobbyCount, playerNr) {\r\n    let lobbyId = 0;\r\n    for (let i = 0; i < lobbyCount; i++) {\r\n        let usersInLobbyCount = 0;\r\n        const joinButton = document.getElementById(`join:${i}`);\r\n        const startButton = document.getElementById(`start:${i}`);\r\n        for (const user of users) {\r\n            if (user.playerNr == playerNr) {\r\n                lobbyId = user.lobby;\r\n            }\r\n            if(user.lobby == i){\r\n                usersInLobbyCount++;\r\n            }\r\n        }\r\n        if(lobbyId == i){\r\n            joinButton.disabled = true;\r\n            if(usersInLobbyCount >= 2)\r\n                startButton.disabled = false;\r\n        } else {\r\n            joinButton.disabled = false;\r\n            startButton.disabled = true;\r\n        }\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/logic/lobbies.js?");

/***/ }),

/***/ "./src/logic/wsHandler.js":
/*!********************************!*\
  !*** ./src/logic/wsHandler.js ***!
  \********************************/
/*! exports provided: initLobbies, updateUsers, joinLobby, startGame, newUser, send */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLobbies\", function() { return initLobbies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateUsers\", function() { return updateUsers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"joinLobby\", function() { return joinLobby; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGame\", function() { return startGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newUser\", function() { return newUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"send\", function() { return send; });\n/* harmony import */ var _lobbies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lobbies */ \"./src/logic/lobbies.js\");\n\r\n\r\n/**\r\n * Creates lobbies in DOM\r\n *\r\n * @param {WebSocket}ws\r\n * @param {number}lobbyCount Amount of lobbies to be generated\r\n */\r\nfunction initLobbies(ws, lobbyCount) {\r\n    Object(_lobbies__WEBPACK_IMPORTED_MODULE_0__[\"createLobbies\"])(lobbyCount);\r\n    for (let i = 0; i < lobbyCount; i++) {\r\n        document.getElementById(`join:${i}`).addEventListener(\"click\", () => joinLobby(ws, i));\r\n        document.getElementById(`start:${i}`).addEventListener(\"click\", () => startGame(ws));\r\n    }\r\n}\r\n\r\n/**\r\n * Updates lobby lists and users online list\r\n *\r\n * @param {Array<Object>}users Current state of users\r\n * @param {number}lobbyCount\r\n */\r\nfunction updateUsers(users, lobbyCount) {\r\n    //Reset textareas\r\n    document.getElementById(\"users\").value = \"\";\r\n    for (let i = 0; i < lobbyCount; i++) {\r\n        document.getElementById(`lobby:${i}`).value = \"\";\r\n    }\r\n    //Insert new values\r\n    for (const user of users) {\r\n        const output = `${user.username}\\n`;\r\n        document.getElementById(\"users\").value += output;\r\n        if (user.lobby) {\r\n            document.getElementById(`lobby:${user.lobby}`).value += output;\r\n        }\r\n    }\r\n}\r\n\r\n//=======================================\r\n//Send messages\r\n//=======================================\r\n\r\n/**\r\n * Sends join lobby request to ws\r\n *\r\n * @param {WebSocket}ws\r\n * @param {number}id Id of lobby to join\r\n */\r\nfunction joinLobby(ws,id) {\r\n    send(ws,\"join\", id);\r\n}\r\n\r\n/**\r\n * Sends start command to ws\r\n *\r\n * @param {WebSocket}ws\r\n */\r\nfunction startGame(ws) {\r\n    send(ws,\"start\", \"\");\r\n}\r\n\r\n/**\r\n * Asks user for username and sends it to ws\r\n *\r\n * @param {WebSocket}ws\r\n */\r\nfunction newUser(ws) {\r\n    let name = prompt(\"Enter your player name: \", \"\");\r\n    if (name === \"\" || name === null) {\r\n        name = \"RandomGuy#\" + Math.floor(Math.random() * 10000);\r\n    }\r\n    send(ws,\"name\", name);\r\n}\r\n\r\n/**\r\n * Sends a message to the Websocket server\r\n *\r\n * @param {WebSocket}ws\r\n * @param {string}type Type of message\r\n * @param {string}msg Message\r\n */\r\nfunction send(ws, type, msg) {\r\n    ws.send(`${type}:${msg}`);\r\n}\n\n//# sourceURL=webpack:///./src/logic/wsHandler.js?");

/***/ })

/******/ });