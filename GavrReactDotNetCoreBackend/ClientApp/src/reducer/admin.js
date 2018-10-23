import { SUCCESS, FAIL, GET_ALL_USERS, SORT_USERS, SEARCH_USER } from "../constance";

const defaultState = {
	users: [],
	sortUsers: [],
};

export default (state = defaultState, action) => {
  const {type, responseAPI, payload} = action;
  switch (type) {
	  case GET_ALL_USERS + SUCCESS: return {
		  ...state,
		  users: responseAPI,
	  };

	  case SORT_USERS: return {
		  ...state,
		  sortUsers: payload.selected,
	  };

	  case SEARCH_USER: return {
		  ...state,
		  sortUsers: payload.selected,
	  };
  }
	return state;
}