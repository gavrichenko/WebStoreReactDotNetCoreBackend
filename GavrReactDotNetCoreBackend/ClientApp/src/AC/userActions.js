import {GET_TOKEN, SIGN_UP} from "../constance";

export function getToken(data) {
	return {
		type: GET_TOKEN,
		callAPI: 'api/token',
		typeOfMethod: 'post',
		apiData: { data }
	}
}

export function signUp(data) {
	return {
		type: SIGN_UP,
		callAPI: 'api/account/register',
		typeOfMethod: 'post',
		apiData: { data }
	}
}