const initState = {
  token: localStorage.getItem("token"),
  user_id: localStorage.getItem("user_id"),
  username: localStorage.getItem("username"),
  isAuthenticated: localStorage.getItem("isAuthenticated"),
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("user_id", action.payload.data.id);
      localStorage.setItem("username", action.payload.data.username);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        token: action.payload.data.token,
        user_id: action.payload.data.id,
        username: action.payload.data.username,
        isAuthenticated: true,
        // ...action.payload,
      };
    case "LOGIN_FAILED":
    case "REGISTER_SUCCESS":
      return { ...state, ...action.payload };
    case "REGISTER_FAILED":
      return action.payload;
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("isAuthenticated");
      return {
        // ...initState,
        token: null,
        user_id: null,
        username: null,
        isAuthenticated: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
