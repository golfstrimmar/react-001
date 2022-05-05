import React from "react";
import Landing from "./Landing";
import App from "./App";
import NotFound from "./NotFound";
import { BrowserRouter, Route, Switch }  from "react-router-dom";

const Router = ()=>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />"
        <Route exact path="/restaurant/:restaurantID" component={App} />"
        <Route  component={NotFound} />"
      </Switch>
    </BrowserRouter>
  );
}

export default Router;