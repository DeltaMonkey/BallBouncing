import express from 'express';
import http from 'http';
import WebSocket from 'ws'
import { AddressInfo } from 'node:net';
import * as dotenv from "dotenv";

export class app {

    private app: express.Express;
    private server: http.Server;
    private wss: WebSocket.Server<WebSocket.WebSocket>;

    constructor(){
        this.app = express()
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server( { server: this.server } );

        dotenv.config();

        this.init();
    }
    
    init() {
        this.server.listen(process.env.PORT || 8999, () => {
            let addressInfo: AddressInfo = this.server.address() as AddressInfo;
            if(addressInfo)
                console.log(`Server started on port ${addressInfo.port} :)`);
            else console.log(`Server coult not started`);
        });

        this.initConnections();
    }

    initConnections() {
        this.wss.on('connection', (ws: WebSocket) => {

            ws.on('message', (message: string) => {
                console.log('received: %s', message);
                ws.send(`Hello, you sent -> ${message}`);
            });
    
            ws.send('Hi there, I am a WebSocket server');
        });
    }
}

new app();