import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { NotFoundPage } from "common/pages";
import { DashBoardPanel } from "entities/dashboard";
import { EmployeesPanel } from "entities/employees";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={DashBoardPanel} />
        <Route exact path="/admin/employees/" component={EmployeesPanel} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
};

export default App;
