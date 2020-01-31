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

/***/ "./src/entities/Map.js":
/*!*****************************!*\
  !*** ./src/entities/Map.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Map; });\nclass Map{\r\n    constructor({grid}) {\r\n        this.grid = grid;\r\n    }\r\n\r\n    draw(ctx){\r\n        const size = ctx.canvas.width/16;\r\n        for(let y = 0; y < this.grid.length; y++){\r\n            for(let x = 0; x < this.grid[y].length; x++){\r\n                if(!this.grid[y][x].solid){\r\n                    ctx.fillStyle = \"white\";\r\n                } else{\r\n                    ctx.fillStyle = \"brown\";\r\n                }\r\n                ctx.fillRect(x*size, y*size, size, size);\r\n                ctx.strokeRect(x*size, y*size, size, size);\r\n                ctx.fillStyle = \"black\";\r\n                ctx.fillText(`x:[${this.grid[y][x].tile.x}] y:[${this.grid[y][x].tile.y}]`, x*size + 2, y*size + 10);\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/entities/Map.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _entities_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/Map */ \"./src/entities/Map.js\");\n\r\n\r\nconst canvas = document.getElementById(\"canvas\");\r\nconst ctx = canvas.getContext(\"2d\");\r\n\r\ncanvas.width = window.innerWidth/2;\r\ncanvas.height = window.innerWidth/2;\r\n\r\nconst url = \"ws://localhost:8080/arena_shooter/endpoint\";\r\nconst ws = new WebSocket(url);\r\n\r\nws.addEventListener(\"message\", e =>{\r\n    const data = JSON.parse(e.data);\r\n    if(data.type === \"newUser\"){\r\n        send(prompt(\"Enter your username: \", \"guest\"));\r\n    } else if(data.type === \"map\"){\r\n        console.log(data);\r\n        let map = new _entities_Map__WEBPACK_IMPORTED_MODULE_0__[\"default\"](data.map);\r\n        map.draw(ctx);\r\n    } else if(data.type === \"username\"){\r\n        const output = `${data.username}\\n`;\r\n        document.getElementById(\"users\").value += output;\r\n    }\r\n});\r\n\r\nfunction send(msg){\r\n    ws.send(msg)\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });