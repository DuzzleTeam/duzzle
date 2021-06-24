import axios from "axios";
import { NEW_POST, UPDATED_POST } from "./types";

export function newPost(postType, dataToSubmit) {
  const request = axios
    .post(`/api/${postType}/write`, dataToSubmit)
    .then((res) => res.data);

  return {
    type: NEW_POST,
    payload: request,
  };
}

export function updatedPost() {
  return {
    type: UPDATED_POST,
  };
}
