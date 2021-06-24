import axios from "axios";
import {
  CONFIRM_REGISTER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  EDIT_USER,
  GET_USER,
  NEW_POST,
} from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/register", dataToSubmit)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function confirmRegister(id) {
  const request = axios
    .post(`/api/confirmRegister/${id}`)
    .then((res) => res.data);

  return {
    type: CONFIRM_REGISTER,
    payload: request,
  };
}

export function editUser(dataToSubmit) {
  const request = axios
    .post("/api/users/edit", dataToSubmit)
    .then((res) => res.data);

  return {
    type: EDIT_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/auth").then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function getUser(email) {
  const request = axios.get(`/api/users/${email}`).then((res) => res);

  return {
    type: GET_USER,
    payload: request,
  };
}

export function newPost(postType, dataToSubmit) {
  const request = axios
    .post(`/api/${postType}/write`, dataToSubmit)
    .then((res) => res.data);

  return {
    type: NEW_POST,
    payload: request,
  };
}
