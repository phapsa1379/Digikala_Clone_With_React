import axios from "axios";

const BASE_URL = "http://localhost:3002";

export const setProducts = (data) => {
  return { type: "PRODUCTS_SET_ALL_PRODUCTS", payload: data };
};

export const fetchProducts = () => {
  return (dispatch, getState) => {
    return axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        // console.log("reducer:", response.data);
        dispatch(setProducts(response.data));
        return response.data;
      })
      .catch((error) => {
        // throw new Error('error')
        console.log("error:", error);
        return Promise.reject(error);
      });
  };
};
