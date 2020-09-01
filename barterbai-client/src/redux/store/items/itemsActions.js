import axios from "axios";

const api = "http://localhost:3000";

export const addItemAction = ([item_container, add_this_to_setter]) => async (
  dispatch
) => {
  try {
    const add_item = await axios.post(`${api}/itemsetter/additem`, {
      item_container,
      add_this_to_setter,
    });

    console.log(`@@@ addItemAction success`, add_item);
    // dispatch({ type: "ADD_ITEMS_SUCCESS", payload: add_item.data });
  } catch (e) {
    console.log(`@@@ addItemAction failed`, e.response.data);
    // dispatch({ type: "ADD_ITEMS_FAILED", payload: e.response.data });
  }
};

export const addOfferItemsAction = ([
  item_getter_container,
  add_this_to_getter,
]) => async (dispatch) => {
  console.log(
    `checkj sa before try`,
    item_getter_container,
    add_this_to_getter
  );
  try {
    const add_item = await axios.post(`${api}/itemgetter/addgetter`, {
      item_getter_container,
      add_this_to_getter,
    });

    console.log(`@@@ addOfferItemsAction ACTIONS success`, add_item);
    // dispatch({ type: "ADD_ITEMS_SUCCESS", payload: add_item.data });
  } catch (e) {
    console.log(`@@@ addOfferItemsAction ACTIONS failed`, e.response.data);
    // dispatch({ type: "ADD_ITEMS_FAILED", payload: e.response.data });
  }
};

export const fetchTransactions = (user_id) => async (dispatch) => {
  try {
    const result = await axios.get(`${api}/itemtransactions/${user_id}`);

    console.log(`@@@ fetchTransactions ACTIONS success`, result.data);
    dispatch({ type: "FETCH_TRANSACTIONS_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ fetchTransactions ACTIONS failed`, e.response.data);
    dispatch({ type: "FETCH_TRANSACTIONS_FAILED", payload: e.response.data });
  }
};

export const fetchItems = () => async (dispatch) => {
  try {
    const result = await axios.get(`${api}/itemlist/`);

    // console.log(`@@@ fetchItems success`, result);
    dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ fetchItems failed`, e.response.data);
    dispatch({ type: "FETCH_ITEMS_FAILED", payload: e.response.data });
  }
};

export const fetchItemsByCategory = (search) => async (dispatch) => {
  try {
    const result = await axios.post(`${api}/itemlist/`, search);

    // console.log(`@@@ fetchItemsByCategory success`, result);
    dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ fetchItemsByCategory failed`, e.response.data);
    dispatch({ type: "FETCH_ITEMS_FAILED", payload: e.response.data });
  }
};

export const fetchSingleItemList = ({ setter_id }) => async (dispatch) => {
  try {
    const result = await axios.get(`${api}/itemlist/${setter_id}`);

    // console.log(`@@@ fetchSingleItemList success`, result);
    dispatch({ type: "FETCH_SINGLE_ITEM_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ fetchSingleItemList failed`, e.response.data);
    dispatch({
      type: "FETCH_SINGLE_ITEM_FAILED",
      payload: e.response.data,
    });
  }
};

export const fetchItemsByUser = (user_id) => async (dispatch) => {
  try {
    const result = await axios.get(`${api}/itemlist/user/${user_id}`);

    // console.log(`@@@ fetchItemsByUser success`, result);
    dispatch({ type: "FETCH_ITEM_BY_USER_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ fetchItemsByUser failed`, e.response.data);
    dispatch({
      type: "FETCH_ITEM_BY_USER_FAILED",
      payload: e.response.data,
    });
  }
};

export const fetchItemsByUserAndCategory = (search) => async (dispatch) => {
  console.log(`what is this?`, search);

  try {
    const result = await axios.post(`${api}/itemlist/user/`, search);

    console.log(`@@@ fetchItemsByUserAndCategory success`, result);
    dispatch({
      type: "FETCH_ITEM_BY_USER_SUCCESS",
      payload: result.data,
    });
  } catch (e) {
    console.log(`@@@ fetchItemsByUserAndCategory failed`, e.response.data);
    dispatch({
      type: "FETCH_ITEM_BY_USER_FAILED",
      payload: e.response.data,
    });
  }
};

export const updateViewStatus = (status) => async (dispatch) => {
  try {
    console.log(`status check`, status);
    const result = await axios.put(`${api}/itemsetter/status/`, status);

    console.log(`@@@ updateViewStatus CONTROLLER success`, result);
    dispatch({ type: "UPDATE_STATUS_SUCCESS", payload: result.data });
  } catch (e) {
    console.log(`@@@ updateViewStatus CONTROLLER failed`, e.response.data);
    dispatch({
      type: "UPDATE_STATUS_FAILED",
      payload: e.response.data,
    });
  }
};
