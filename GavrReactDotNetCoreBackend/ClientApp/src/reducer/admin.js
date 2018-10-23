import { SUCCESS, FAIL, GET_ALL_USERS } from "../constance";

const defaultState = {
	users: [],
};

export default (state = defaultState, action) => {
  const {type, responseAPI} = action;
  switch (type) {
	  case GET_ALL_USERS + SUCCESS: return {
		  ...state,
		  users: responseAPI,

	  };
  }
	return state;
}