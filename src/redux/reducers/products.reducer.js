const initialState = {
  products: [],
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_SET_ALL_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export { ProductsReducer };
