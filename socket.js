import { Server } from "socket.io";

function initSocket(server) {
  const io = new Server(server, {
    cors: {
        origin: '*'
    }
  });

  io.on('connection', socket => {
    console.log('A user connected', socket.id);
  });
}

export default initSocket