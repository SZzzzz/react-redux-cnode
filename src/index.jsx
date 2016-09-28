import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import store from './store/configStore';
import { Provider } from 'react-redux';
import { Router, hashHistory, browserHistory } from 'react-router';
import routes from './routes';
require('./styles/index.css');

render(

        <Provider store={store}>
            <Router routes={routes} history={browserHistory}/>
        </Provider>
    ,
    document.getElementById('root')
);

