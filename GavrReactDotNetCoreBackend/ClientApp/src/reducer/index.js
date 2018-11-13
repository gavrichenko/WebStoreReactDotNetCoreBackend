import {combineReducers} from 'redux';
import flowersReducer from './flowers';
import userReducer from "./user";
import cartReducer from "./cart";
import adminReducer from "./admin";
import redirectReducer from "./redirect";
import orderReducer from "./order";

export default combineReducers({
  flowers: flowersReducer,
  userInfo: userReducer,
  cart: cartReducer,
  admin: adminReducer,
  redirect: redirectReducer,
  order: orderReducer,
});