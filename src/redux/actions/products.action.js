import { getProducts } from "api/products.api";

export const setProducts = (data) => {
  return { type: "PRODUCTS_SET_ALL_PRODUCTS", payload: data };
};

export const fetchProducts = () => {
  return (dispatch, getState) => {
    return getProducts()
      .then((response) => {
        console.log("reducer:", response);
        dispatch(setProducts(response));
        return response;
      })
      .catch((error) => {
        // throw new Error('error')
        console.log("error:", error);
        return Promise.reject(error);
      });
  };
};
