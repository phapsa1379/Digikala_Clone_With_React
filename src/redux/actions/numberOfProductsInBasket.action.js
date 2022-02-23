const setNumberOfProductsInBasket = (numberOfProductsInBasket) => {
  return {
    type: "SET_NUMBER_OF_PRODUCTS_IN_BASKET",
    data: numberOfProductsInBasket,
  };
};
export { setNumberOfProductsInBasket };
