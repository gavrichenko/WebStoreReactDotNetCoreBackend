import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../constance";

const defaultState = {
  //items: [],
	items: [{ "id": 5, "name": "DB Flower", "price": 1299, "description": "Flower description here...", "image": "http://image.gavrichenko.ru/flowers/1.jpg", "rating": 5 }, { "id": 6, "name": "Второй цветок", "price": 999, "description": "тут описание для второго цветка", "image": "http://image.gavrichenko.ru/flowers/2.jpg", "rating": 2 }, { "id": 7, "name": "Третий цветок", "price": 102, "description": "тут описание для третего цветка", "image": "http://image.gavrichenko.ru/flowers/3.jpg", "rating": 4 }, { "id": 8, "name": "Четверый цветок", "price": 1221, "description": "тут описание для 4 цветка", "image": "http://image.gavrichenko.ru/flowers/4.jpg", "rating": 1 }, { "id": 9, "name": "Пятый цветок", "price": 1488, "description": "тут описание для 5 цветка", "image": "http://image.gavrichenko.ru/flowers/5.jpg", "rating": 3 }],
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