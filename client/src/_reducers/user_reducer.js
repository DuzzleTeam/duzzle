import {
	CONFIRM_REGISTER,
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER
} from "../_actions/types";

export default function _(state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginPayload: action.payload };

		case REGISTER_USER:
			return { ...state, registerPayload: action.payload };

		case CONFIRM_REGISTER:
			return { ...state, confirmRegisterPayload: action.payload };

		case AUTH_USER:
			return { ...state, userData: action.payload };
		default:
			return state;
	}
}
