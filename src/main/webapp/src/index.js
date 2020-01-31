import Map from "./entities/Map";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth/2;
canvas.height = window.innerWidth/2;

const url = "ws://localhost:8080/arena_shooter/endpoint";
const ws = new WebSocket(url);

ws.addEventListener("message", e =>{
    const data = JSON.parse(e.data);
    if(data.type === "newUser"){
        send(prompt("Enter your username: ", "guest"));
    } else if(data.type === "map"){
        console.log(data);
        let map = new Map(data.map);
        map.draw(ctx);
    } else if(data.type === "username"){
        const output = `${data.username}\n`;
        document.getElementById("users").value += output;
    }
});

function send(msg){
    ws.send(msg)
}


