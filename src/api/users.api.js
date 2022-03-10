import http from "services/http.service";

export async function getUsers() {
  try {
    const response = await http.get(`/users`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function postUsers(data) {
  try {
    const response = await http.post(`/users`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function putUsers(subUrl, data) {
  try {
    const response = await http.put(`/users/${subUrl}`, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function deleteUsers(subUrl) {
  try {
    const response = await http.delete(`/users/${subUrl}`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
