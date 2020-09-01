const bcrypt = require("bcryptjs");
const r = require("rethinkdb");

const users_collection = r.table("users");
const tokens_collection = r.table("tokens");

class Users {
  constructor(data) {
    this.data = data;
  }

  async registerUser(username, password) {
    try {
      const hashed_password = await bcrypt.hash(
        password,
        await bcrypt.genSalt()
      );

      await users_collection
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
        // data: reg_user.changes[0]["new_val"],
      };
    } catch (e) {
      return { success: false, message: "Registration failed!" };
    }
  }

  async loginUser(username) {
    try {
      const user = await users_collection
        // .filter({ username })
        .getAll(username, { index: "username" })
        .coerceTo("array")
        .run(connection);

      if (user.length <= 0) throw "Login failed, user does not exist.";

      if (!(await bcrypt.compare(this.data.password, user[0].password)))
        throw "Login failed, invalid password!";

      if (user[0].is_online) {
        throw "Login failed, user is currently online!";
      }
      return {
        id: user[0].id,
        username: user[0].username,
        is_online: user[0].is_online,
      };
    } catch (e) {
      console.log(`\n@@@ loginUser`, e);
      throw e;
    }
  }

  // async getUserByName(username) {
  //   try {
  //     const user = await users_collection
  //       // .filter({ username })
  //       .getAll(username, { index: "username" })
  //       .coerceTo("array")
  //       .run(connection);

  //     return user[0];
  //   } catch (e) {
  //     console.log(`@@@ getUserByName`, e);
  //   }
  // }

  async getUserIdByToken(token) {
    try {
      const user = await tokens_collection
        // .filter({ token })
        .getAll(token, { index: "token" })
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
        // .filter({ username })
        .getAll(username, { index: "username" })
        .coerceTo("array")
        .run(connection);

      if (user.length > 0) throw "Login failed, user does not exist.";
    } catch (e) {
      console.log(`\n@@@ userExists`, e);
      throw e;
    }
  }

  async userHasToken(user_id) {
    try {
      const user = await tokens_collection
        // .filter({ user_id })
        .getAll(user_id, { index: "user_id" })
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

  async loginUpdateToken(user_id, token) {
    try {
      await tokens_collection
        // .filter({ user_id })
        .getAll(user_id, { index: "user_id" })
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
