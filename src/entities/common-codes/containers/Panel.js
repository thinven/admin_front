import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import { withStyles } from "@material-ui/core/styles";

import { Header, List, Form } from "../components";
import { Form as GroupForm } from "entities/common-code-groups/components";

import * as actions from "../store/reducer";
import * as groupActions from "entities/common-code-groups/store/reducer";

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
  handleOpenGroupForm = original => {
    this._groupForm.handleOpenEdit(original);
  };
  //===========================================================================

  render() {
    const {
      result,
      list,
      pages,
      loading,
      form,
      info,
      Actions,
      groupList,
      groupResult,
      groupForm,
      GroupActions,
      useCodes,
      classes,
      handleSendMsg
    } = this.props;
    const { contentWrap } = classes;
    const { handleOpenForm, handleOpenEditForm, handleOpenGroupForm } = this;
    return (
      <section className={contentWrap}>
        <Header handleOpenForm={handleOpenForm} />
        <List
          list={list}
          pages={pages}
          listLoading={loading}
          Actions={Actions}
          useCodes={useCodes}
          handleOpenEditForm={handleOpenEditForm}
          handleOpenGroupForm={handleOpenGroupForm}
        />
        <Form
          innerRef={node => (this._form = node)}
          result={result}
          form={form}
          info={info}
          Actions={Actions}
          groupList={groupList}
          GroupActions={GroupActions}
          useCodes={useCodes}
          handleSendMsg={handleSendMsg}
        />
        <GroupForm
          innerRef={node => (this._groupForm = node)}
          result={groupResult}
          form={groupForm}
          Actions={GroupActions}
          CommonCodeActions={Actions}
          useCodes={useCodes}
        />
      </section>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Panel" }),
  connect(
    ({ commonCodeReducer, commonCodeGroupReducer }) => ({
      list: commonCodeReducer.get("list"),
      useCodes: commonCodeReducer.get("useCodes").toJS(),
      pages: commonCodeReducer.get("pages"),
      loading: commonCodeReducer.get("loading"),
      info: commonCodeReducer.get("info").toJS(),
      form: commonCodeReducer.get("form").toJS(),
      result: commonCodeReducer.get("result").toJS(),
      groupList: commonCodeGroupReducer.get("list").toJS(),
      groupForm: commonCodeGroupReducer.get("form").toJS(),
      groupResult: commonCodeGroupReducer.get("result").toJS()
    }),
    dispatch => ({
      Actions: bindActionCreators(actions, dispatch),
      GroupActions: bindActionCreators(groupActions, dispatch)
    })
  )
)(withRouter(Panel));
