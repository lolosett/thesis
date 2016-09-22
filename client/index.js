import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import SignIn from './components/signin';
import reducers from './reducers/root_reducer';
import UserQuestionnaire from './containers/userQuestionnaire'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='signin' component={SignIn} />
      <Route path='userQuestionnaire' component={UserQuestionnaire}/>
    </Router>
  </Provider>
, document.getElementById('main'));
