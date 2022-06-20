import WebSocket from 'ws'

export class connection {
    private wss: WebSocket.Server<WebSocket.WebSocket>;

    constructor(
        wss: WebSocket.Server<WebSocket.WebSocket>
    ){
        this.wss = wss;

        this.init(this.wss);
    }

    init(wss: WebSocket.Server<WebSocket.WebSocket>) {
        this.wss.on('connection', (ws: WebSocket) => {

            ws.on('message', (message: string) => {
                console.log('received: %s', message);
                ws.send(`Hello, you sent -> ${message}`);
            });
    
            ws.send('Hi there, I am a WebSocket server');
        });
    }
}