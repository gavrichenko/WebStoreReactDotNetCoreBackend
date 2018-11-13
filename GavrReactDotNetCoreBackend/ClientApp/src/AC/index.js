import {GET_FLOWERS, GET_FLOWER, ADD_FLOWER} from "../constance";

export function getFlowers() {
  return {
    type: GET_FLOWERS,
    callAPI: 'api/Product/products',
    typeOfMethod: 'get',
  }
}

export function addFlower(data) {
  return {
    type: ADD_FLOWER,
    callAPI: 'api/product/',
    typeOfMethod: 'post',
    isAuthorize: true,
    apiData: { data }
  }
}

export function getFlower(id) {
  return {
    type: GET_FLOWER,
    callAPI: `tasks/${id}`,
  }
}