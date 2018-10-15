import {DELETE_ARTICLE, INCREMENT, CHANGE_SELECTION, GET_FLOWERS, GET_FLOWER, ADD_FLOWER, GET_TOKEN} from "../constance";

export function increment() {
  return {
    type: INCREMENT
  }
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    payload: { id }
  }
}

export function changeSelection(selected) {
  return {
    type: CHANGE_SELECTION,
    payload: { selected }
  }
}

export function getFlowers() {
  return {
    type: GET_FLOWERS,
    callAPI: 'flowers/',
  }
}

export function addFlower(data) {
  return {
    type: ADD_FLOWER,
    callAPI: 'flowers/',
    typeOfMethod: 'post',
    apiData: { data }
  }
}

export function getFlower(id) {
  return {
    type: GET_FLOWER,
    callAPI: `tasks/${id}`,
  }
}

export function getToken(data) {
	return {
		type: GET_TOKEN,
		callAPI: 'api/token/token',
		typeOfMethod: 'post',
		apiData: { data }
	}
}