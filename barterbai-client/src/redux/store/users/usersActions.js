import axios from "axios";

const api = "http://localhost:3000";

export const registerAction = (newuser) => async (dispatch) => {
  try {
    const result = await axios.post(`${api}/users/register`, newuser);

    console.log(`@@@ registerAction success`, result);
    dispatch({ type: "REGISTER_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ registerAction failed`, e.response.data);
    throw dispatch({ type: "REGISTER_FAILED", payload: e.response.data });
  }
};

export const loginAction = (user) => async (dispatch) => {
  try {
    const result = await axios.post(`${api}/users/login`, user);

    console.log(`@@@ loginAction success`, result);
    dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ loginAction failed`, e.response.data);
    dispatch({ type: "LOGIN_FAILED", payload: e.response.data });
  }
};

export const logoutAction = (token) => async (dispatch) => {
  try {
    const result = await axios.post(`${api}/users/logout`, { token });

    console.log(`@@@ logoutAction success`, result);
    await dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (e) {
    console.log(`@@@ logoutAction failed`, e);
    dispatch({ type: "LOGIN_FAILED" });
  }
};
