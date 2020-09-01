const initState = {
  item_categories: [],
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        item_categories: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
