'use Client'
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
// eslint-disable-next-line react-hooks/exhaustive-deps

const useWebSocketConnectionHook = (
    event: string,
    cb: (arg: unknown) => void,
) => {
    
    const socketRef = useRef<any>(null);
    
    function socketClient() {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            socket.on(event as string, (data) => {
                cb(data);
            });
            console.log("Connected with id: ", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        socket.on("connect_error", async (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        socketRef.current = socket;
  }

  useEffect(() => {

    socketClient();
    return ()=> {
      socketRef?.current?.disconnect();
    }

  },[]);

  const emitMessage = (event: string, data: unknown) => {
    if (socketRef.current) {
        socketRef.current.emit(event, data);
    }
  }

  return { emitMessage };
}

export default useWebSocketConnectionHook;