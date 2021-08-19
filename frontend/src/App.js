import React from "react";
import "./css/App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// Components imports
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Wishlist from "./pages/Wishlist";
import Friends from "./pages/Friends";
import Checkout from "./pages/Checkout";
import Bestbuy from "./pages/Bestbuy";
import Settings from "./pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/ForgotPassword" exact component={ForgotPassword}></Route>
        <Route path="/NewPassword" exact component={NewPassword}></Route>
        <ProtectedRoute
          exact={true}
          path="/home"
          component={Home}
        ></ProtectedRoute>
        <ProtectedRoute
          exact={true}
          path="/calendar"
          component={Calendar}
        ></ProtectedRoute>
        <ProtectedRoute
          exact={true}
          path="/wishlist"
          component={Wishlist}
        ></ProtectedRoute>
        <ProtectedRoute
          exact={true}
          path="/friends"
          component={Friends}
        ></ProtectedRoute>
        {/* <ProtectedRoute
          exact={true}
          path="/checkout"
          component={Checkout}
        ></ProtectedRoute> */}
        {/* <ProtectedRoute
          exact={true}
          path="/bestbuy"
          component={Bestbuy}
        ></ProtectedRoute> */}
        <ProtectedRoute
          exact={true}
          path="/settings"
          component={Settings}
        ></ProtectedRoute>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
