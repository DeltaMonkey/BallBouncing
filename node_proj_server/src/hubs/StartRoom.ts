import WebSocket from 'ws'
import { RoomBL } from '../business/RoomBL'
import { StartRoomRequest } from '../domain/requests/server/StartRoomRequest';

export class StartRoom{

    StartRoom(ws: WebSocket, p1: number, p2: number): void {
        var roomBL = new RoomBL();
        var req: StartRoomRequest = roomBL.CreateRoom(p1, p2);
        
        ws.send(JSON.stringify(req));
    }
}