import { SUCCESS, FAIL, GET_TOKEN, GET_USER_INFO, GET_ROLE_BY_NAME, UPDATE_USER_INFO } from "../constance";

const defaultState = {
	isLoggedIn: false,
	email: undefined,
	firstName: undefined,
	lastName: undefined,
	birthday: undefined,
	gender: undefined,
	location: undefined,
	phone: undefined,
	roles: [],
};

export default (userState = defaultState, action) => {
  const {type, responseAPI} = action;
  switch (type) {
	  case GET_TOKEN + SUCCESS: return {
		  ...userState,
		  isLoggedIn: true,
	  };

	  case GET_TOKEN + FAIL: return {
		  ...userState,
		  isLoggedIn: false,
	  };

	  case GET_USER_INFO + SUCCESS: return {
		  ...userState,
		  isLoggedIn: true,
		  email: responseAPI.email,
		  firstName: responseAPI.firstName,
		  lastName: responseAPI.lastName,
		  birthday: responseAPI.birthday,
		  gender: responseAPI.gender,
		  city: responseAPI.city,
		  phone: responseAPI.phone
	  };

	  case GET_ROLE_BY_NAME + SUCCESS: return {
		  ...userState,
		  roles: responseAPI,
	  };

	  case UPDATE_USER_INFO + SUCCESS: return {
		  ...userState,
	  };
  }
  return userState;
}