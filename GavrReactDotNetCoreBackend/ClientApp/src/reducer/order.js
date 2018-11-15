import { SEND_ORDER, CLOSE_SUCCESS_NOTIFICATION, START, SUCCESS, FAIL } from "../constance";

const defaultState = {
	isSuccess: false,
	isNew: false,
	orderData: null,
};

export default (state = defaultState, action) => {
	const { type, responseAPI } = action;
	switch (type) {
		case SEND_ORDER + SUCCESS: return {
			...state,
			isSuccess: true,
			isNew: true,
			orderData: responseAPI,
		};
		case CLOSE_SUCCESS_NOTIFICATION: return {
			...state,
			isSuccess: false,
			isNew: false,
		};
	}
	return state;
}