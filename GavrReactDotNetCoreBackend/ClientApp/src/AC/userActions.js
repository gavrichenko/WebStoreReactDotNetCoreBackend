import { GET_TOKEN, SIGN_UP, SIGN_OUT, GET_USER_INFO, UPDATE_USER_INFO, GET_ALL_USERS, SORT_USERS, SEARCH_USER, TOGGLE_USERCARD_ADMIN} from "../constance";

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

export function signOut() {
	return {
		type: SIGN_OUT,
	}
}

export function getUserInfo(userName) {
	return {
		type: GET_USER_INFO,
		callAPI: `api/customer/${userName}`,
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

export function getAllUsers() {
	return {
		type: GET_ALL_USERS,
		callAPI: `api/customer/customers`,
		isAuthorize: true,
		typeOfMethod: 'get',
	}
}

export function sortUsers(selected) {
	return {
		type: SORT_USERS,
		payload: { selected }
	}
}

export function searchUser(selected) {
	return {
		type: SEARCH_USER,
		payload: { selected }
	}
}

export function toggleUserCard(userCardState, userEmail) {
	return {
		type: TOGGLE_USERCARD_ADMIN,
		payload: { userCardState, userEmail }
	}
}