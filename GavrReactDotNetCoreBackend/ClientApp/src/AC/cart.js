import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, OPEN_ORDER_IN_MODAL, GET_ITEMS_FROM_LOCAL_STORAGE } from "../constance";

export function addItemToCart(itemObj) {
	return {
		type: ADD_ITEM_TO_CART,
		payload: itemObj,
	}
}

export function getItemsFromLocalStorage() {
	return {
		type: GET_ITEMS_FROM_LOCAL_STORAGE,
	}
}

export function removeItemFromCart(id) {
	return {
		type: REMOVE_ITEM_FROM_CART,
		payload: id,
	}
}

export function openOrderInModal(isOpen) {
	return {
		type: OPEN_ORDER_IN_MODAL,
		payload: isOpen,
	}
}