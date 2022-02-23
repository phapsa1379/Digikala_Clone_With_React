import http from "services/http.service";

export async function getOrders() {
  try {
    const response = await http.get(`/orders`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function postOrders(data) {
  try {
    const response = await http.post(`/orders`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function putOrders(subUrl, data) {
  try {
    const response = await http.put(`/orders/${subUrl}`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function deleteOrders(subUrl) {
  try {
    const response = await http.delete(`/orders/${subUrl}`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
