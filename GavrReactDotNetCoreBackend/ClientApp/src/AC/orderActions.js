import { SEND_ORDER, CLOSE_SUCCESS_NOTIFICATION, SUCCESS } from "../constance";

export function sendOrder(data) {
	return {
		type: SEND_ORDER,
		callAPI: 'api/order',
		isAuthorize: false,
		typeOfMethod: 'post',
		apiData: { data }
	}
};

export function closeSuccessNotify() {
	return {
		type: CLOSE_SUCCESS_NOTIFICATION,
	}
};