const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let Users = require("../models/Users");

// @route   POST /users/register
// @desc    Register a new user
// @access  Public
exports.registerUser = async (req, res) => {
  const user = new Users();

  const { username, password, con_pass } = req.body;

  try {
    // if (username != "" && password != "" && con_pass != "") {
    if (!username || !password || !con_pass)
      throw "Registration failed, empty fields!";

    if (await user.userExists(username))
      throw "Registration failed, username exists!";
    if (password !== con_pass)
      throw "Registration failed, password don't match!";

    const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt());

    const result = await user.registerUser(username, hashed_password);

    console.log(`\n@@@ registerUser`, result);
    res.json(result);
  } catch (e) {
    console.log(`\n@@@ registerUser`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};

// @route   POST /users/login
// @desc    Authenticate  user / Login
// @access  Public
exports.loginUser = async (req, res) => {
  const user = new Users(req.body);
  const { username, password } = req.body;

  try {
    if (!username || !password) throw "Login failed, empty fields!";

    if (!(await user.userExists(username)))
      throw "Login failed, user does not exist.";

    const {
      id,
      password: hashed_password,
      is_online,
    } = await user.getUserByName(username);

    const validate_user = await bcrypt.compare(password, hashed_password);
    if (!validate_user) throw "Login failed, invalid password!";

    if (is_online) throw "Login failed, user is currently online!";

    await user.loginUpdateStatus(id);

    const token = await jwt.sign(
      {
        username,
      },
      process.env.JWTSECRET,
      { expiresIn: 3600 }
    );

    const has_token = await user.userHasToken(id);

    if (!has_token) {
      await user.loginAddToken(id, token);
    } else {
      await user.loginUpdateToken(id, token);
    }

    console.log(`\n@@@ loginUser`, {
      id,
      username,
      password: hashed_password,
      token,
    });

    res.json({
      success: true,
      message: "Login success!",
      data: {
        token,
        username,
      },
    });
  } catch (e) {
    console.log(`\n@@@ loginUser`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};

// @route   DELETE /user/delete/:id
// @desc    Delete a user
// @access  Public
exports.deleteUser = async (req, res) => {
  const user = new Users();

  try {
    const delete_user = await user.deleteUser(req.params.id);

    console.log(`\n@@@ deleteUser`, delete_user);
    res.json(delete_user);
  } catch (e) {
    console.log(`\n@@@ deleteUser`, { success: false, message: e });
    res.json({ success: false, message: e });
  }
};

// -------------

// @GET
// GET All Users
exports.getAllUsers = async (req, res) => {
  const user = new Users();
  const result = await user.getAllUsers();
  res.json(result);
};

// @PUT/:id
// Update a User
exports.updateUser = async (req, res) => {
  const user = new Users(req.params.id);
  const result = await user.updateUser();
  res.json(result);
};
