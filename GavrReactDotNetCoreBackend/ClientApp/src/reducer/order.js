import { SEND_ORDER, CLOSE_SUCCESS_NOTIFICATION, START, SUCCESS, FAIL } from "../constance";

const defaultState = {
	isSuccess: false,
	isNew: false,
};

export default (state = defaultState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SEND_ORDER: return {
			...state,
			isSuccess: true,
			isNew: true,
		};
		case CLOSE_SUCCESS_NOTIFICATION: return {
			...state,
			isSuccess: false,
			isNew: false,
		};
	}
	return state;
}