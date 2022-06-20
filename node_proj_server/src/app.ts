import express from 'express';
import http from 'http';
import WebSocket from 'ws'
import { AddressInfo } from 'node:net';
import * as dotenv from "dotenv";
import { connection } from './hubs/index';

export class app {

    private app: express.Express;
    private server: http.Server;
    private wss: WebSocket.Server<WebSocket.WebSocket>;

    private connection: connection;

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

        this.connection = new connection(this.wss);
    }
}

new app();