import { SET_FILTER } from "../constance";

export function setFilter(filter) {
	return {
		type: SET_FILTER,
		payload: filter
	}
}