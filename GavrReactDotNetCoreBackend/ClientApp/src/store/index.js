import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//import log from '../middlewares/logger';
import api from '../middlewares/api';

const enhancer = applyMiddleware(api, thunk, logger);
const store = createStore(reducer, {}, enhancer );

//only dev
window.store = store;

export default store;
