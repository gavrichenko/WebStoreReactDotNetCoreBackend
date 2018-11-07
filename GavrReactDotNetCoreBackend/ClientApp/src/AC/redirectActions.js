import { REDIRECT_FROM_LOGIN_TO_CART } from "../constance";

export function redirectFromLoginToCart(isRedirect) {
	return {
		type: REDIRECT_FROM_LOGIN_TO_CART,
		payload: isRedirect,
	}
}