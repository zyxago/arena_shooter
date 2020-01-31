import Map from "./entities/Map";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const url = "ws://localhost:8080/arena_shooter/endpoint";
const ws = new WebSocket(url);

ws.addEventListener("message", e =>{

    const data = JSON.parse(e.data);
    console.log(e.data);
    if(data.newUser){
        console.log("new user");
        const output = `${data.newUser}\n`;
        document.getElementById("users").value += output;
    } else if(data.map){
        console.log("map");
        console.log(data.map);
        let map = new Map(data.map);
        map.draw(ctx);
    }
});


