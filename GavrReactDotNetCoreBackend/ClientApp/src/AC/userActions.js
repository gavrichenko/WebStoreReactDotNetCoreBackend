import { GET_TOKEN, SIGN_UP, GET_USER_INFO, UPDATE_USER_INFO} from "../constance";

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

export function getUserInfo(userName) {
	return {
		type: GET_USER_INFO,
		callAPI: `api/customer?userName=${userName}`,
		isAuthorize: true,
		typeOfMethod: 'get',
	}
}

export function updateUserInfo(userName, data) {
	return {
		type: UPDATE_USER_INFO,
		callAPI: `api/customer/${userName}`,
		isAuthorize: true,
		typeOfMethod: 'put',
		apiData: { data },
	}
}