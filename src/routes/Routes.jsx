import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import HomeOptimized from "../pages/HomeOptimized";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import SignIn from "../pages/signin/SignIn.jsx";
import SignUp from "../pages/signup/SignUp.jsx";
import SignInEnhanced from "../pages/signin/SignInEnhanced.jsx";
import SignUpEnhanced from "../pages/signup/SignUpEnhanced.jsx";
import UserProfile from "../pages/profile/UserProfile.jsx";
import * as Config from "../constants/Config";

const Routes = () => {
  return (
    <Switch>
      {/* Original routes */}
      <Route path={`/${Config.HOME_PAGE}/signin`} component={SignIn} />
      <Route path={`/${Config.HOME_PAGE}/signup`} component={SignUp} />

      {/* Enhanced routes */}
      <Route path="/signin" component={SignInEnhanced} />
      <Route path="/signup" component={SignUpEnhanced} />
      <Route path="/profile" component={UserProfile} />

      {/* Optimized routes */}
      <Route path="/home-optimized" component={HomeOptimized} />

      <Route
        path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
        component={Catalog}
      />
      <Route path={`/${Config.HOME_PAGE}/:category/:id`} component={Detail} />
      <Route path={`/${Config.HOME_PAGE}/:category`} component={Catalog} />
      <Route path={`/${Config.HOME_PAGE}`} exact component={Home} />

      {/* Default redirect to home */}
      <Redirect to={`/${Config.HOME_PAGE}`} />
    </Switch>
  );
};

export default Routes;
