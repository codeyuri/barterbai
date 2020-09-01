const initState = {
  items: [],
  current_item: [],
  added_item: [],
  own_items: [],
  own_transactions: [],
};

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ITEMS_SUCCESS":
      return {
        ...state,
        added_item: action.payload,
      };
    case "FETCH_ITEMS_SUCCESS":
      return {
        ...state,
        items: action.payload,
      };
    case "FETCH_SINGLE_ITEM_SUCCESS":
      return {
        ...state,
        current_item: action.payload,
      };
    case "FETCH_ITEM_BY_USER_SUCCESS":
      return {
        ...state,
        own_items: action.payload,
      };
    case "FETCH_TRANSACTIONS_SUCCESS":
      return {
        ...state,
        own_transactions: action.payload,
      };
    case "UPDATE_STATUS_SUCCESS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_ITEMS_FAILED":
    case "FETCH_SINGLE_ITEM_FAILED":
    case "FETCH_ITEM_BY_USER_FAILED":
    case "FETCH_ITEMS_FAILED":
    case "FETCH_TRANSACTIONS_FAILED":
    case "UPDATE_STATUS_FAILED":
    default:
      return state;
  }
};

export default itemsReducer;
