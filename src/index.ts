import WebSocket, {WebSocketServer} from "ws";
import express from "express"

const app = express()

app.get("/", async(req,res)=>{
    res.send("hi there")
})
const httpServer = app.listen(8080,()=>{
    console.log("server connected")
})

const wss = new WebSocketServer({server: httpServer});
let userCount = 0;
wss.on('connection',function connection(ws) {
    ws.on('error',console.error);

    ws.on('message', function MessageChannel(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary});
            }
        })
    })
    console.log("user connected", ++userCount)
    ws.send('HEllo! Message From Server !!');
})