import express from 'express';
import http from 'http';
import WebSocket from 'ws'
import { AddressInfo } from 'node:net';
import * as dotenv from "dotenv";
import { HandShake } from './hubs/HandShake';
import { State } from './domain/State';
import { StartRoom } from './hubs/StartRoom';

export class app {

    private app: express.Express;
    private server: http.Server;
    private wss: WebSocket.Server<WebSocket.WebSocket>;

    private state: State;

    private handShake: HandShake;
    private startRoom: StartRoom;

    constructor(){
        this.app = express()
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server( { server: this.server } );
        this.state = new State();

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

        this.startRoom = new StartRoom();
        this.handShake = new HandShake(this.wss, this.state, this.startRoom);
    }
}

new app();