import * as dotEnv from 'dotenv';
dotEnv.config();
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import axios from "axios";
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.SOCKET_SERVER_NAME;
const port = process.env.SOCKET_SERVER_PORT;
const apiUrl =  process.env.API_BASE;;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("a client socket connected", socket.id);

        socket.on('requestData', async (request) => {

            try {
                const response = await axios.get(`${apiUrl}?leagueIdList=&matchDate=${request.matchDate}&liveOnly=${request.liveOnly}&lang=en_KH&timeZone=Asia%2FBangkok`);
                if (response.data) {
                    socket.emit('sendData', {
                        message: 'success',
                        data: response.data?.result || []
                    });
                }
            } catch (error) {
                console.log('request api with error: ', error);
                socket.emit('sendData', {
                    message: 'failed',
                    data: []
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("client disconnected with id: ", socket.id);
        });
    });

    httpServer.once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
    .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});