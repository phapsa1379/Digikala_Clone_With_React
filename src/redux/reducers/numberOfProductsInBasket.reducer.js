const initialState = {
  numberOfProductsInBasket: 0,
};

const NumberOfProductsInBasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NUMBER_OF_PRODUCTS_IN_BASKET":
      return { ...state, numberOfProductsInBasket: action.data };
    default:
      return state;
  }
};

export { NumberOfProductsInBasketReducer };
