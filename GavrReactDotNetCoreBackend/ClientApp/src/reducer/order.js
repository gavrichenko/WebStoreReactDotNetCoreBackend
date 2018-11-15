import { SEND_ORDER, CLOSE_SUCCESS_NOTIFICATION, GET_ORDERS_LIST_WITH_PRICE,
	 GET_ORDER_DETAILS, IS_ORDER_CARD_OPEN, START, SUCCESS, FAIL } from "../constance";

const defaultState = {
	isSuccess: false,
	isNew: false,
	orderNumber: null,
	orderDetails: {},
	adminOrdersList: [],
	adminOrdersTotalPrice: null,
	isOrderCardOpen: false,
};

export default (state = defaultState, action) => {
	const { type, payload, responseAPI } = action;
	switch (type) {
		case SEND_ORDER + SUCCESS: return {
			...state,
			isSuccess: true,
			isNew: true,
			orderNumber: responseAPI,
		};
		case GET_ORDER_DETAILS + SUCCESS: return {
			...state,
			orderDetails: responseAPI,
		};
		case GET_ORDERS_LIST_WITH_PRICE + SUCCESS: return {
			...state,
			adminOrdersList: responseAPI.orders,
			adminOrdersTotalPrice: responseAPI.totalPrice,
		};
		case CLOSE_SUCCESS_NOTIFICATION: return {
			...state,
			isSuccess: false,
			isNew: false,
		};
		case IS_ORDER_CARD_OPEN: return {
			...state,
			isOrderCardOpen: payload,

		};
	}
	return state;
}