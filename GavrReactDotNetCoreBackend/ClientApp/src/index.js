import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

// imported components
import App from './components/App';
import './index.css';


registerServiceWorker();

ReactDOM.render(
  (
    <Provider store = {store}>
        <App />
    </Provider>

  ), document.getElementById('root'));