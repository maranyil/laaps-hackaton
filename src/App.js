import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import { auth } from './firebase';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import './App.css';

import InitView from "./components/auth/InitView/InitView";
import Login from "./components/auth/Login/Login";
import Profile from "./components/auth/Profile/Profile";
import Payment from "./components/auth/Payment/Payment";
import CreditCardView from "./components/auth/Payment/CreditCard";
import ServiceForm from './components/auth/ServiceConfig/ServiceForm';
import Mapbox from './mapbox/Mapbox';

function App(props) {

  //  const [viewNavbar, setViewNavbar] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser !== false ? (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <InitView />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/profile' >
            <Profile />
          </Route>
          <Route path='/payment' >
            <Payment />
          </Route>
          <Route path='/creditcard'>
            <CreditCardView />
          </Route>
          <Route path='/serviceform'>  
            <ServiceForm />
          </Route>
          <Route path='/mapbox' >
            <Mapbox />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  ) : (
      <p>Cargando...</p>
    );
}

export default App;