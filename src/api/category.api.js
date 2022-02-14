import http from "services/http.service";

export async function getCategory() {
  try {
    const response = await http.get(`/category`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function postCategory(data) {
  try {
    const response = await http.post(`/category`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function putCategory(subUrl, data) {
  try {
    const response = await http.put(`/category/${subUrl}`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function deleteCategory(subUrl) {
  try {
    const response = await http.delete(`/category/${subUrl}`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
