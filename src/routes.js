import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignIn from './page/OnBoarding/SignIn'
import Home from './page/home'
import NotFound from './page/NotFound'
import {Propietario, Mascotas} from './page'
import { AuthProvider, FetchProvider } from './context' ;
function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <FetchProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <SignIn />
            </Route>
            <Route exact path="/propietarios">
              <Propietario />
            </Route>
            <Route exact path="/mascotas">
              <Mascotas />
            </Route>
            <Route exact component={NotFound} />
          </Switch>
        </FetchProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routes
