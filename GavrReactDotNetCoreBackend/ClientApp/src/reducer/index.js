import {combineReducers} from 'redux';
import counterReducer from './counter';
import articlesReducer from './articles';
import filterReducer from './filters';
import flowersReduser from './flowers';
import usersReduser from "./users";

export default combineReducers({
  count: counterReducer,
  articles: articlesReducer,
  filters: filterReducer,
  flowers: flowersReduser,
  users: usersReduser,
});