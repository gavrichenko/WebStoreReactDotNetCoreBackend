import { GET_ROLE_BY_NAME } from "../constance";

export function getUserRole(userName) {
	return {
		type: GET_ROLE_BY_NAME,
		callAPI: `api/roles/getRoleByUserName?userName=${userName}`,
		isAuthorize: false,
		typeOfMethod: 'get',
	}
}