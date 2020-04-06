import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TopNavbar from './components/layout/TopNav';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CurWork from './components/auth/CurWork';
import AlertComp from './components/layout/AlertComp';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <TopNavbar />
        <Route exact path='/' component={Landing} />
        <Container>
          <AlertComp />
          <Switch>
            <Route exact path='/currentworkout' component={CurWork} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
