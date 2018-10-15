import {CHANGE_SELECTION, DELETE_ARTICLE} from "../constance";

const defaultFilters = {
  selected: [],
};

export default (filters = defaultFilters, action) => {
  const {type, payload} = action;

  switch (type) {
    case CHANGE_SELECTION:
      return {...filters, selected: payload.selected}
  }
  return filters;
}