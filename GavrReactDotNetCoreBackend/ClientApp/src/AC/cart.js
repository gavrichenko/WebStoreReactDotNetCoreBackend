import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../constance";

export function addItemToCart(itemObj) {
	return {
		type: ADD_ITEM_TO_CART,
		payload: itemObj,
	}
}

export function removeItemFromCart(id) {
	return {
		type: REMOVE_ITEM_FROM_CART,
		payload: id,
	}
}