import {GET_TOKEN} from "../constance";

export function getToken(data) {
	return {
		type: GET_TOKEN,
		callAPI: 'api/token/token',
		typeOfMethod: 'post',
		apiData: { data }
	}
}