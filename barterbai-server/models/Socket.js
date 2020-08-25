const r = require("rethinkdb");
const socket_collection = r.table("socket");

class Socket {
  constructor(data) {
    this.data = data;
  }

  async userHasSocket(user_id) {
    try {
      const user = await socket_collection
        .filter({ user_id })
        .coerceTo("array")
        .run(connection);

      if (user.length > 0) return true;
    } catch (e) {
      console.log(`\n@@@ userHasSocket`, e);
      return false;
    }
  }

  async loginAddSocket(user_id, socket_id) {
    try {
      await socket_collection
        .insert({
          user_id,
          socket_id,
        })
        .run(connection);
    } catch (e) {
      console.log(`\n@@@ loginAddSocket`, e);
    }
  }

  async loginUpdateSocket(user_id, socket_id) {
    try {
      await socket_collection
        .filter({ user_id })
        .update({ socket_id })
        .run(connection);
    } catch (e) {
      console.log(`\n@@@ loginUpdateSocket`, e);
    }
  }
}

module.exports = Socket;
