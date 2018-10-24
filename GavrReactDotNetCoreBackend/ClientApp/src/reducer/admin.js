import { SUCCESS, FAIL, GET_ALL_USERS, SORT_USERS, SEARCH_USER, TOGGLE_USERCARD_ADMIN } from "../constance";

const defaultState = {
	users: [],
	sortUsers: [],
	isOpenUserCard: false,
	userCardEmail: '', 
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

	  case TOGGLE_USERCARD_ADMIN: return {
		  ...state,
		  isOpenUserCard: payload.userCardState,
		  userCardEmail: payload.userEmail,
	  };
  }
	return state;
}