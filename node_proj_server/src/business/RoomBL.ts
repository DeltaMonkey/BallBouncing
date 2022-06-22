import { LargeNumberLike } from "crypto";
import { Ball } from "../domain/models/Ball";
import { StartRoomRequest } from "../domain/requests/server/StartRoomRequest" 

const BLUECOLOR: string = "#0000FF"
const REDCOLOR: string = "#FF0000"
const BALLCOUNT: number = 10

export class RoomBL {

    public CreateRoom(p1: number, p2: number): StartRoomRequest {
        let req = new StartRoomRequest();

        for (let index = 0; index < BALLCOUNT / 2; index++) {
            let ball: Ball = new Ball(p1, BLUECOLOR, index);
            req.BallList.push(ball);
        }

        for (let index = BALLCOUNT / 2; index < BALLCOUNT; index++) {
            let ball: Ball = new Ball(p2, REDCOLOR, index);
            req.BallList.push(ball);
        }

        return req;
    }
}