import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../constance";

const defaultState = {
  items: [],
};

export default (state = defaultState, action) => {
  const {type, responseAPI} = action;
  switch (type) {
	  case ADD_ITEM_TO_CART:
      return {
        ...state,
		  items: [...state.items, action.payload],
		};

	  case REMOVE_ITEM_FROM_CART:
		  return {
			  ...state,
			  items: state.items.filter(o => o.id != action.payload),
		};

    default:
      return state;
  }
}