const initState = {
  sample: "",
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "BUY_PIZZA": {
      // const itemSold = state.itemSold + Number(action.payload)
      // return {
      //     ...state,
      //     itemQuantity: state.itemQuantity - action.payload,
      //     itemSold,
      //     currentEarning: state.itemPrice * itemSold,
      //     isSold: true
      // }
    }
    default:
      return state;
  }
};

export default usersReducer;
