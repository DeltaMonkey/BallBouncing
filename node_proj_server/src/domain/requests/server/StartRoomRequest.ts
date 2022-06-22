import { RequestTypes } from '../../enums/RequestTypes';
import { Ball } from '../../models/Ball'
import { Request } from '../request';

export class StartRoomRequest extends Request{
    public BallList: Ball[]

    constructor() {
        super();

        this.RequestType = RequestTypes.StartRoom;
        this.BallList = [];
    }
}