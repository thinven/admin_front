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
  //===========================================================================

  /**
   * 신규등록폼 관련 이벤트.
   */
  handleOpenForm = () => {
    this._form.handleOpen();
  };
  //===========================================================================

  /**
   * 수정폼 관련 이벤트.
   */
  handleOpenEditForm = original => {
    this._form.handleOpenEdit(original);
  };
  //===========================================================================

  /**
   * 삭제 관련 이벤트.
   */
  handleDeleteConfirm = original => {
    const { FormActions, ListActions, handleConfirm } = this.props;
    FormActions.loadEmployee({
      info: original
    });
    handleConfirm({
      title: "삭제 알림",
      desc: original.id + "님을 삭제 하시겠습니까?",
      onOk: async () => {
        try {
          await FormActions.delEmployee(original);
          ListActions.delEmployee(original);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  //===========================================================================

  render() {
    const {
      result,
      list,
      pages,
      loading,
      ListActions,
      form,
      FormActions,
      genderCodes,
      classes,
      handleSendMsg
    } = this.props;
    const { contentWrap } = classes;
    const { handleOpenForm, handleOpenEditForm, handleDeleteConfirm } = this;
    return (
      <section className={contentWrap}>
        <Header handleOpenForm={handleOpenForm} />
        <List
          list={list}
          pages={pages}
          listLoading={loading}
          ListActions={ListActions}
          genderCodes={genderCodes}
          handleOpenEditForm={handleOpenEditForm}
          handleDeleteConfirm={handleDeleteConfirm}
        />
        <Form
          innerRef={node => (this._form = node)}
          form={form}
          result={result}
          FormActions={FormActions}
          ListActions={ListActions}
          genderCodes={genderCodes}
          handleSendMsg={handleSendMsg}
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
      genderCodes: employeeList.get("genderCodes").toJS(),
      form: employeeForm.get("form").toJS(),
      result: employeeForm.get("result").toJS()
    }),
    dispatch => ({
      ListActions: bindActionCreators(listActions, dispatch),
      FormActions: bindActionCreators(formActions, dispatch),
      InfoActions: bindActionCreators(infoActions, dispatch)
    })
  )
)(withRouter(Panel));
