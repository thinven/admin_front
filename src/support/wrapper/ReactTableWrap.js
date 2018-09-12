import React, { Component } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

class ReactTableWrap extends Component {
  render() {
    const { ...other } = this.props;
    return (
      <ReactTable
        ofText="/"
        rowsText="건"
        manual={true}
        filterable={true}
        sortable={false}
        defaultPageSize={10}
        showPageJump={false}
        previousText="이전"
        nextText="다음"
        loadingText="준비하는중..."
        noDataText="정보가 존재하지 않습니다."
        className="-striped -highlight"
        style={{ textAlign: "center" }}
        {...other}
      />
    );
  }
}

export default ReactTableWrap;
