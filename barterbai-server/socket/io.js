const r = require("rethinkdb");

const { joinSocket, disconnectSocket } = require("./controllers/users");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`New connection from: ${socket.id}`);

    socket.on("join_socket", async (token) => {
      console.log(`@@@ join_socket`, token);
      await joinSocket(token, { socket_id: socket.id });
    });
    socket.on("disconnect", async (socket) => {
      await disconnectSocket(socket.id);
    });
  });
};
