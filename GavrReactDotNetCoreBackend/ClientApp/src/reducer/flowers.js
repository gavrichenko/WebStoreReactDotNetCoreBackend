import {GET_FLOWERS, GET_FLOWER, ADD_FLOWER, START, SUCCESS} from "../constance";

const defaultState = {
  data: [],
  lastCreatedFlower: [],
  flowerData: [],
  loading: false,
  loaded: false,
};

export default (state = defaultState, action) => {
  const {type, responseAPI} = action;
  switch (type) {
   //for getting a new flower via GET request of API
    case GET_FLOWERS + START:
      return {
        ...state,
        loading: true,
      };
    case GET_FLOWERS + SUCCESS:
      return {
        ...state,
        data: responseAPI,
        loading: false,
        loaded: true,
      };

   //for creating a new flower via POST request of API
    case ADD_FLOWER + START:
      return {
        ...state,
        loading: true,
      };
    case ADD_FLOWER + SUCCESS:
      return {
        ...state,
        lastCreatedFlower: responseAPI,
        loading: false,
        loaded: true,
      };

    //hz zachem
    case GET_FLOWER + SUCCESS:
      return {
        ...state,
        flowerData: responseAPI,
        loading: false,
        loaded: true,
      };

    default:
      return state;
  }
}