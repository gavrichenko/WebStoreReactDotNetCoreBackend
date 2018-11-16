import { SEND_ORDER, CLOSE_SUCCESS_NOTIFICATION, GET_ORDERS_LIST_WITH_PRICE,
	IS_ORDER_CARD_OPEN, GET_ORDER_DETAILS, GET_ORDERS_LIST_BY_USER} from "../constance";

export function sendOrder(data) {
	return {
		type: SEND_ORDER,
		callAPI: 'api/order',
		isAuthorize: false,
		typeOfMethod: 'post',
		apiData: { data }
	}
};

export function getOrderListWithPrice() {
	return {
		type: GET_ORDERS_LIST_WITH_PRICE,
		callAPI: 'api/order/getAllWithPrice',
		isAuthorize: false,
		typeOfMethod: 'get',
	}
};

export function getOrdersListByUser(userName) {
	return {
		type: GET_ORDERS_LIST_BY_USER,
		callAPI: `api/order/user/${userName}`,
		isAuthorize: false,
		typeOfMethod: 'get',
	}
};

export function getOrderDetails(orderId) {
	return {
		type: GET_ORDER_DETAILS,
		callAPI: `api/order/${orderId}`,
		isAuthorize: false,
		typeOfMethod: 'get',
	}
};

export function isOrderCartOpen(isOpen) {
	return {
		type: IS_ORDER_CARD_OPEN,
		payload: isOpen,
	}
};

export function closeSuccessNotify() {
	return {
		type: CLOSE_SUCCESS_NOTIFICATION,
	}
};