import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import { withStyles } from "@material-ui/core/styles";

import { Header, List, Form } from "../components";

import * as actions from "../store/reducer";

import * as roleActions from "entities/roles/store/reducer";

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
    const { Actions, handleConfirm } = this.props;
    Actions.loadEmployee({
      info: original
    });
    handleConfirm({
      title: "삭제 알림",
      desc: original.id + "님을 삭제 하시겠습니까?",
      onOk: async () => {
        try {
          await Actions.delEmployee(original);
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
      form,
      Actions,
      roleList,
      RoleActions,
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
          Actions={Actions}
          genderCodes={genderCodes}
          handleOpenEditForm={handleOpenEditForm}
          handleDeleteConfirm={handleDeleteConfirm}
        />
        <Form
          innerRef={node => (this._form = node)}
          form={form}
          result={result}
          Actions={Actions}
          roleList={roleList}
          RoleActions={RoleActions}
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
    ({ employeeReducer, roleReducer }) => ({
      list: employeeReducer.list,
      pages: employeeReducer.pages,
      loading: employeeReducer.loading,
      genderCodes: employeeReducer.genderCodes,
      form: employeeReducer.form,
      result: employeeReducer.result,
      roleList: roleReducer.list
    }),
    dispatch => ({
      Actions: bindActionCreators(actions, dispatch),
      RoleActions: bindActionCreators(roleActions, dispatch)
    })
  )
)(withRouter(Panel));
