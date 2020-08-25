let Users = require("../../models/Users");
let Socket = require("../../models/Socket");

const joinSocket = async (get_token, { socket_id }) => {
  const user = new Users();
  const user_socket = new Socket();

  //   console.log(`@@@ joinSocket`, get_token, socket_id);

  try {
    const { user_id, token } = await user.getUserIdByToken(get_token);

    // console.log(`@@@ joinSocket`, user_id, token);

    if (!token) throw "join socket failed";

    const has_socket = await user_socket.userHasSocket(user_id);

    console.log(`@@@@ has_socket`, has_socket);

    if (has_socket !== undefined) {
      await user_socket.loginUpdateSocket(user_id, socket_id);
    } else {
      await user_socket.loginAddSocket(user_id, socket_id);
    }
  } catch (e) {}
};

const disconnectSocket = () => {};

module.exports = { joinSocket, disconnectSocket };
