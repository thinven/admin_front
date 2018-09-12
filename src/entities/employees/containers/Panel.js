import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import { withStyles } from "@material-ui/core/styles";

import { Header, List, Form } from "../components";

import * as listActions from "../store/list";
import * as formActions from "../store/form";
import * as infoActions from "../store/info";

const styles = theme => ({
  contentWrap: {
    padding: theme.spacing.unit,
    backgroundColor: "#f9f9f9"
  }
});

class Panel extends Component {
  state = {
    formOpen: false
  };

  /**
   * 목록 관련 이벤트.
   */
  handlePetchData = (state, instance) => {
    const { ListActions } = this.props;
    ListActions.startLoading();
    ListActions.getEmployees(
      Object.assign(
        {
          page: state.page + 1, //react-table page가 0부터 시작함
          pageSize: state.pageSize,
          sorted: state.sorted
        },
        this.resetFiltered(state.filtered)
      )
    );
  };
  resetFiltered = filtered => {
    let max = filtered.length;
    let result = {};
    for (let idx = 0; idx < max; idx++) {
      result[filtered[idx].id] = filtered[idx].value;
    }
    return result;
  };
  //===========================================================================

  /**
   * 신규등록폼 관련 이벤트.
   */
  handleOpenForm = () => {
    this.setState({
      formOpen: true
    });
  };
  handleChangeInput = e => {
    const { FormActions } = this.props;
    const { name, value } = e.target;
    FormActions.changeInput({ name, value });
  };
  handleSubmit = async () => {
    const { form, FormActions, ListActions } = this.props;
    try {
      await FormActions.addEmployee(form.toJS());
      ListActions.addEmployee(form.toJS());
      this.handleCloseForm();
    } catch (e) {
      console.log(e);
    }
  };
  handleCloseForm = () => {
    this.setState({ formOpen: false });
  };
  //===========================================================================

  render() {
    const { formOpen } = this.state;
    const { classes, form, list, pages, loading } = this.props;
    const { contentWrap } = classes;
    const {
      handlePetchData,
      handleOpenForm,
      handleChangeInput,
      handleSubmit,
      handleCloseForm
    } = this;
    return (
      <section className={contentWrap}>
        <Header onOpenForm={handleOpenForm} />
        <List
          list={list.toJS()}
          pages={pages}
          listLoading={loading}
          onFetchData={handlePetchData}
        />
        <Form
          form={form.toJS()}
          formOpen={formOpen}
          onCloseForm={handleCloseForm}
          onSubmit={handleSubmit}
          onChangeInput={handleChangeInput}
        />
      </section>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Panel" }),
  connect(
    ({ employeeList, employeeForm }) => ({
      list: employeeList.get("list"),
      pages: employeeList.get("pages"),
      loading: employeeList.get("loading"),
      form: employeeForm.get("form")
    }),
    dispatch => ({
      ListActions: bindActionCreators(listActions, dispatch),
      FormActions: bindActionCreators(formActions, dispatch),
      InfoActions: bindActionCreators(infoActions, dispatch)
    })
  )
)(withRouter(Panel));
