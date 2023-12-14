import { WebSocketServer } from 'ws';
import { parse as urlParse } from 'url';

export default class wsServer {
    constructor(server) {
        this.server = new WebSocketServer({ server });
        this.vendorConnections = {}
        this.server.on("connection", (connection, request) => {
            const { id, identity } = urlParse(request.url, true).query;
            console.log(`${identity} ${id} connect websocket`);
            if (identity === 'vendor')
                this.vendorConnections[id] = connection;
            
            connection.on('message', bytesmsg => {
                const message = JSON.parse(bytesmsg.toString());
                console.log(`ws recieve ${message}`);
                if(this.vendorConnections[message.Vendor_ID]) {
                    this.vendorConnections[message.Vendor_ID].send(JSON.stringify(message));
                }
            });
        })
    }
}