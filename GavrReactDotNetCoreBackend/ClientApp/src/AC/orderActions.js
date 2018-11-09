import { SEND_ORDER, CLOSE_SUCCESS_NOTIFICATION, SUCCESS } from "../constance";

export function sendOrder(orderData) {
	return {
		type: SEND_ORDER,
		payload: orderData,
	}
};

export function closeSuccessNotify() {
	return {
		type: CLOSE_SUCCESS_NOTIFICATION,
	}
};