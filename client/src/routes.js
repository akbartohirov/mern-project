import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import AuthPage from "./pages/AuthPage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/links">
          <LinksPage />
        </Route>

        <Route exact path="/create">
          <CreatePage />
        </Route>

        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
