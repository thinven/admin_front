import React, { Component } from "react";

import AdminTemplate from "common/admin-template";
import { Panel } from "./containers";

class PanelPage extends Component {
  render() {
    return (
      <AdminTemplate>
        <Panel />
      </AdminTemplate>
    );
  }
}

export default PanelPage;
