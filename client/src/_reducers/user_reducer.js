import {
  CONFIRM_REGISTER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  EDIT_USER,
  GET_USER,
  NEW_POST,
} from "../_actions/types";

export default function _(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginPayload: action.payload,
        user: {
          user_id: action.user_id,
        },
      };

    case REGISTER_USER:
      return { ...state, registerPayload: action.payload };

    case CONFIRM_REGISTER:
      return { ...state, confirmRegisterPayload: action.payload };

    case AUTH_USER:
      return { ...state, authPayload: action.payload };

    case EDIT_USER:
      return { ...state, editPayload: action.payload };

    case GET_USER:
      return { ...state, getPayload: action.payload };

    case NEW_POST:
      return { ...state, newPostPayload: action.payload };

    default:
      return state;
  }
}
