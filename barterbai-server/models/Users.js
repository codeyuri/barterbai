const r = require("rethinkdb");
const users_collection = r.table("users");
const tokens_collection = r.table("tokens");

class Users {
  constructor(data) {
    this.data = data;
  }

  async registerUser(username, hashed_password) {
    try {
      const reg_user = await users_collection
        .insert(
          {
            username,
            password: hashed_password,
            admin: false,
            is_online: false,
          },
          { returnChanges: true }
        )
        .run(connection);

      return {
        success: true,
        message: "Registration success, user created!",
        data: reg_user.changes[0]["new_val"],
      };
    } catch (e) {
      return { success: false, message: "Registration failed!" };
    }
  }

  async getUserByName(username) {
    try {
      const user = await users_collection
        .filter({ username })
        .coerceTo("array")
        .run(connection);

      return user[0];
    } catch (e) {
      console.log(`@@@ getUserByName`, e);
    }
  }

  async getUserIdByToken(token) {
    try {
      const user = await tokens_collection
        .filter({ token })
        .coerceTo("array")
        .run(connection);

      return user[0];
    } catch (e) {
      console.log(`@@@ getUserIdByToken`, e);
    }
  }

  async userExists(username) {
    try {
      const user = await users_collection
        .filter({ username })
        .coerceTo("array")
        .run(connection);

      if (user.length > 0) return true;
    } catch (e) {
      console.log(`\n@@@ userExists`, e);
      return false;
    }
  }

  async userHasToken(user_id) {
    try {
      const user = await tokens_collection
        .filter({ user_id })
        .coerceTo("array")
        .run(connection);

      if (user.length > 0) return true;
    } catch (e) {
      console.log(`\n@@@ userHasToken`, e);
      return false;
    }
  }

  async loginAddToken(id, token) {
    try {
      await tokens_collection
        .insert({
          user_id: id,
          token,
        })
        .run(connection);
    } catch (e) {
      console.log(`\n@@@ loginAddToken`, e);
    }
  }

  async loginUpdateToken(id, token) {
    try {
      await tokens_collection
        .filter({ user_id: id })
        .update({ token })
        .run(connection);
    } catch (e) {
      console.log(`\n@@@ loginAddToken`, e);
    }
  }

  async loginUpdateStatus(id) {
    try {
      await users_collection
        .get(id)
        .update({ is_online: true })
        .run(connection);
    } catch (e) {
      console.log(`\n@@@ loginUpdateStatus`, e);
    }
  }

  async logoutUpdateStatus(id) {
    try {
      await users_collection
        .get(id)
        .update({ is_online: false })
        .run(connection);
    } catch (e) {
      console.log(`\n@@@ logoutUpdateStatus`, e);
    }
  }

  getAllUsers() {
    return this.data;
  }

  updateUser() {
    return this.data;
  }

  async deleteUser(id) {
    try {
      const delete_user = await users_collection
        .get(id)
        .delete()
        .run(connection);

      if (delete_user.deleted) {
        return { success: true, message: "User deleted successfully!" };
      } else {
        throw "User does not exist!";
      }
    } catch (e) {
      return { success: false, message: e };
    }
  }
}

module.exports = Users;
