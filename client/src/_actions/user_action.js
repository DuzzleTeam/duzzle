import axios from "axios";
import {
	CONFIRM_REGISTER,
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER
} from "./types";

export function loginUser(dataToSubmit) {
	const request = axios
		.post("/api/login", dataToSubmit)
		.then(response => response.data);

	return {
		type: LOGIN_USER,
		payload: request
	};
}

export function registerUser(dataToSubmit) {
	const request = axios
		.post("/api/register", dataToSubmit)
		.then(res => res.data);

	return {
		type: REGISTER_USER,
		payload: request
	};
}

export function confirmRegister(id) {
	const request = axios
		.post(`/api/confirmRegister/${id}`)
		.then(res => res.data);

	return {
		type: CONFIRM_REGISTER,
		payload: request
	};
}

export function auth() {
	const request = axios.get("/api/auth").then(response => response.data);

	return {
		type: AUTH_USER,
		payload: request
	};
}
