import { BallSpawnPositions } from "../enums/BallSpawnPositions";

export class Ball {
    public UserID: number;
    public Color: string;
    public Position: BallSpawnPositions;

    constructor(
        userID: number,
        color: string,
        position: BallSpawnPositions
    ){
        this.UserID = userID;
        this.Color = color;
        this.Position = position;
    }
}