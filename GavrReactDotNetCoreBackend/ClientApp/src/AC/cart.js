import { ADD_ITEM_TO_CART } from "../constance";

export function addItemToCart(itemData) {
	return {
		type: ADD_ITEM_TO_CART,
		payload: itemData,
	}
}