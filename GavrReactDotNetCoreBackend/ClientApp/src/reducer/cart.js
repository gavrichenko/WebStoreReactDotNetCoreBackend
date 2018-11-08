import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, OPEN_ORDER_IN_MODAL, GET_ITEMS_FROM_LOCAL_STORAGE } from "../constance";
import _ from 'lodash';

const defaultState = {
	items: [],
	isOpenInModal: false,
};

export default (state = defaultState, action) => {
	const { type, payload } = action;

	// adding "count" key to the added item and initializing it by zero if it is new item in a cart or another case +1
	function addCountPropertyOrIncrease() {
		let result = _.find(state.items, (item) => item.id === action.payload.id);
		if (result) {
			result.count += 1;
		} else {
			result = _.assign(action.payload, { count: 1 });
		}
		return result;
	};

	function decreaseCountProperty() {
		let result = _.find(state.items, (item) => item.id === action.payload);
		result.count -= 1;
		return result;
	}

	switch (type) {
		case OPEN_ORDER_IN_MODAL:
			return {
				...state,
				isOpenInModal: payload,
			};

		case GET_ITEMS_FROM_LOCAL_STORAGE:
		const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cart_items'));
			if (itemsFromLocalStorage === null){
				return {
					...state,
					items: defaultState.items,
				};
			}
			return {
				...state,
				items: itemsFromLocalStorage,
			};

		case ADD_ITEM_TO_CART:
			const newItem = addCountPropertyOrIncrease();
			let res = [...state.items, newItem]
			localStorage.setItem('cart_items', JSON.stringify(_.uniqWith(res, _.isEqual)));
			return {
				...state,
				items: _.uniqWith(res, _.isEqual),
			};

		case REMOVE_ITEM_FROM_CART:
			const shouldRemove = decreaseCountProperty();
			let result;
			if (shouldRemove.count < 1) {
				result = state.items.filter(o => o.id != action.payload)
			} else {
				let addToList = [...state.items, shouldRemove];
				result = _.uniqWith(addToList, _.isEqual)
			}
			localStorage.setItem('cart_items', JSON.stringify(result));
			return {
				...state,
				items: result,
			};

		default:
			return state;
	}
}