import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Details from "./pages/Details";
import { getNewsSource } from "./state/actions/news";
import { signInUser } from "./state/actions/auth";

const App = (props) => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && !state.loggedIn) {
      dispatch(signInUser());
    }
    dispatch(getNewsSource());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/Home" exact component={Home} />
        <PrivateRoute path="/Profile" exact component={Profile} />
        <PrivateRoute
          path="/Home/:newsItemPublishedAt"
          exact
          component={Details}
        />
        {!state.loggedIn ? (
          <>
            <Route path="/" exact component={Login} />
            <Redirect from="*" to="/" />
          </>
        ) : (
          <Redirect from="/" to="/Home" />
        )}
      </Switch>
    </Router>
  );
};

export default App;
