import { NEW_POST, UPDATED_POST } from "../_actions/types";

export default function _(state = {}, action) {
  switch (action.type) {
    case NEW_POST:
      return { ...state, newPostPayload: action.payload };

    case UPDATED_POST:
      return { ...state, newPostPayload: null };

    default:
      return state;
  }
}
