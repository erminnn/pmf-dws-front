/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import EditProfile from "views/examples/EditProfile.js";
import AddOrEditOfferService from "views/examples/AddOrEditOfferService.js";
import UserCountryReview from "views/examples/UserCountryReview.js";
import AddOrEditUserCountryReview from "views/examples/AddOrEditUserCountryReview.js";
import InspireMe from "views/examples/InspireMe.js";
import UserOfferServices from "views/examples/UserOfferServices.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile-page" exact component={Profile} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/edit-profile" component={EditProfile} />
      <Route
        exact
        path="/offer-service/:id/:action"
        component={AddOrEditOfferService}
      />
      <Route exact path="/country-review" component={UserCountryReview} />
      <Route
        exact
        path="/country-review/:id/:action"
        component={AddOrEditUserCountryReview}
      />
      <Route exact path="/inspire" component={InspireMe} />
      <Route exact path="/offer-services" component={UserOfferServices} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
