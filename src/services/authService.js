import jwtDecode from "jwt-decode";
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(data) {
  const { username: email, password } = data;
  const /*{ data: jwt }*/ promise = await httpService.post(apiEndpoint, {
      email,
      password,
    });
  localStorage.setItem(tokenKey, promise.data);
  return promise;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
