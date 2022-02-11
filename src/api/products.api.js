import http from "services/http.service";

export async function getProducts() {
  try {
    const response = await http.get(`/products`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function postProducts(data) {
  try {
    const response = await http.post(`/products`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function putProducts(subUrl, data) {
  try {
    const response = await http.put(`/products/${subUrl}`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
