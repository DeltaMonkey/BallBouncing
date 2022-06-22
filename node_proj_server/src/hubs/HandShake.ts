import WebSocket from 'ws'
import { State } from '../domain/State'
import { StartRoom } from './StartRoom';

export class HandShake {
    private wss: WebSocket.Server<WebSocket.WebSocket>;
    private state: State;
    private startRoom: StartRoom;

    constructor(
        wss: WebSocket.Server<WebSocket.WebSocket>,
        state: State,
        startRoom: StartRoom
    ){
        this.wss = wss;
        this.state = state;
        
        this.startRoom = startRoom;

        this.init(this.wss);
    }

    init(wss: WebSocket.Server<WebSocket.WebSocket>) {
        this.wss.on('connection', (ws: WebSocket) => {

            let userID: number = this.connectUser();

            ws.send(userID);

            if(this.state.IdList.length == 2){
                this.startRoom.StartRoom(ws, this.state.IdList[0], this.state.IdList[1]);
            }

            ws.on('message', (message: string) => {
                console.log('received: %s', message);
            });
        });
    }
    
    connectUser(): number {
        var userID = this.state.ConnectUser();
        return userID;
    }
}