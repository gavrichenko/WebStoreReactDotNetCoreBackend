import {combineReducers} from 'redux';
import counterReducer from './counter';
import articlesReducer from './articles';
import filterReducer from './filters';
import flowersReducer from './flowers';
import userReducer from "./user";
import cartReducer from "./cart";
import adminReducer from "./admin";
import redirectReducer from "./redirect";

export default combineReducers({
  count: counterReducer,
  articles: articlesReducer,
  filters: filterReducer,
  flowers: flowersReducer,
  userInfo: userReducer,
  cart: cartReducer,
  admin: adminReducer,
  redirect: redirectReducer,
});