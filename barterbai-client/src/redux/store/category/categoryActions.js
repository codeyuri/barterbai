import axios from "axios";

const api = "http://localhost:3000";

export const getCategories = () => async (dispatch) => {
  try {
    const result = await axios.get(`${api}/category/`);

    console.log(`@@@ getCategories success`, result);
    dispatch({ type: "GET_CATEGORIES", payload: result.data });
  } catch (e) {
    console.log(`@@@ getCategories failed`, e.response.data);
    // throw dispatch({ type: "GET_CATEGORIES_FAILED", payload: e.response.data });
  }
};
