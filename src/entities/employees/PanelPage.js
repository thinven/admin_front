import React, { Component, Fragment } from "react";

import AdminTemplate from "common/admin-template";
import { Panel } from "./containers";

class PanelPage extends Component {
  render() {
    return (
      <Fragment>
        <AdminTemplate>
          <Panel />
        </AdminTemplate>
      </Fragment>
    );
  }
}

export default PanelPage;
