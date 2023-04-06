import { Server } from "socket.io";

function initSocket(server) {
  const io = new Server(server, {
    cors: {
        origin: '*'
    }
  });

  io.on('connection', socket => {
    socket.on('joinRoom', chatId => {
        socket.join(chatId);
    })
    socket.on('sendMessage', data => {
        socket.to(data.chatId).emit('receiveMessage', data.newMessage);
    })
  });
}

export default initSocket