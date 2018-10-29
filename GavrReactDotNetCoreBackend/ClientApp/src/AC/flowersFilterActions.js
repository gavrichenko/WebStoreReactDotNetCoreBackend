import { SET_FILTER, SET_FILTER_BY_QUERY } from "../constance";

export function setFilter(filter) {
	return {
		type: SET_FILTER,
		payload: filter,
	}
}

export function setSearchQuery(value) {
	return {
		type: SET_FILTER_BY_QUERY,
		payload: value,
	}
}