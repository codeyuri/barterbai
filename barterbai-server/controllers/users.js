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
    if (!username || !password || !con_pass) throw "Failed, empty fields!";

    if (await user.userExists(username)) throw "Failed, username exists!";
    if (password !== con_pass) throw "Failed, password don't match!";

    const result = await user.registerUser(username, password);

    console.log(`\n@@@ registerUser`, result);
    res.json(result);
  } catch (e) {
    console.log(`\n@@@ registerUser`, { success: false, message: e });
    res.status(404).send({ success: false, message: e });
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

    const login_user = await user.loginUser(username);

    await user.loginUpdateStatus(login_user.id);

    const token = await jwt.sign(
      {
        username,
      },
      process.env.JWTSECRET,
      { expiresIn: 3600 }
    );

    const has_token = await user.userHasToken(login_user.id);

    if (!has_token) {
      await user.loginAddToken(login_user.id, token);
    } else {
      await user.loginUpdateToken(login_user.id, token);
    }

    // console.log(`\n@@@ loginUser`, login_user);

    res.json({
      success: true,
      message: "Login success!",
      data: { token: token, ...login_user },
    });
  } catch (e) {
    console.log(`\n@@@ loginUser`, { success: false, message: e });
    res.status(401).send({ success: false, message: e });
  }
};

// @route   POST /user/logout/:id
// @desc    Logout a user
// @access  Public
exports.logoutUser = async (req, res) => {
  const user = new Users();

  try {
    const get_id = await user.getUserIdByToken(req.body.token);

    const logout_user = await user.logoutUpdateStatus(get_id.user_id);

    res.json(logout_user);
  } catch (e) {
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
