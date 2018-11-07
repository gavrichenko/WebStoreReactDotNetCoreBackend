import { REDIRECT_FROM_LOGIN_TO_CART } from "../constance";

const defaultState = {
	fromLoginToCart: false,
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
	  case REDIRECT_FROM_LOGIN_TO_CART: return {
		  ...state,
		  fromLoginToCart: payload,
	  };
  }
	return state;
}