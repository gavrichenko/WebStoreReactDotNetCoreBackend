import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../constance";
import _ from 'lodash';

const defaultState = {
  items: [],
};

export default (state = defaultState, action) => {
  const {type, responseAPI} = action;

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
	  case ADD_ITEM_TO_CART:
		  const newItem = addCountPropertyOrIncrease();
		  let res = [...state.items, newItem]
	      return {
	        ...state,
			  items: _.uniqWith(res, _.isEqual),
			};

	  case REMOVE_ITEM_FROM_CART:
		  const shouldRemove = decreaseCountProperty();		  
		  let result;
		  console.log(shouldRemove.count)
		  if (shouldRemove.count < 1) {
			  result = state.items.filter(o => o.id != action.payload)
		  } else {
			  let addToList = [...state.items, shouldRemove];
			  result = _.uniqWith(addToList, _.isEqual)
		  }
		  return {
			  ...state,
			  items: result,
		};

    default:
      return state;
  }
}