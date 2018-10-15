import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk'
import logger from '../middlewares/logger'
import api from '../middlewares/api';

const enhancer = applyMiddleware(thunk, api, logger);
const store = createStore(reducer, {}, enhancer );

//only dev
window.store = store;

export default store;
