import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";

import { withStyles } from "@material-ui/core/styles";

import { Header, List, Form } from "../components";
import { Form as GroupForm } from "entities/common-code-groups/components";

import * as listActions from "../store/list";
import * as infoActions from "../store/info";
import * as formActions from "../store/form";

import * as groupListActions from "entities/common-code-groups/store/list";
import * as groupFormActions from "entities/common-code-groups/store/form";

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
      ListActions,
      form,
      info,
      FormActions,
      groupList,
      GroupListActions,
      groupResult,
      groupForm,
      GroupFormActions,
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
          ListActions={ListActions}
          useCodes={useCodes}
          handleOpenEditForm={handleOpenEditForm}
          handleOpenGroupForm={handleOpenGroupForm}
        />
        <Form
          innerRef={node => (this._form = node)}
          result={result}
          form={form}
          info={info}
          FormActions={FormActions}
          ListActions={ListActions}
          groupList={groupList}
          GroupListActions={GroupListActions}
          useCodes={useCodes}
          handleSendMsg={handleSendMsg}
        />
        <GroupForm
          innerRef={node => (this._groupForm = node)}
          result={groupResult}
          form={groupForm}
          FormActions={GroupFormActions}
          CommonCodeListActions={ListActions}
          useCodes={useCodes}
        />
      </section>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Panel" }),
  connect(
    ({
      commonCodeList,
      commonCodeForm,
      commonCodeGroupList,
      commonCodeGroupForm
    }) => ({
      list: commonCodeList.get("list"),
      useCodes: commonCodeList.get("useCodes").toJS(),
      pages: commonCodeList.get("pages"),
      loading: commonCodeList.get("loading"),
      form: commonCodeForm.get("form").toJS(),
      info: commonCodeForm.get("info").toJS(),
      result: commonCodeForm.get("result").toJS(),
      groupList: commonCodeGroupList.get("list").toJS(),
      groupForm: commonCodeGroupForm.get("form").toJS(),
      groupResult: commonCodeGroupForm.get("result").toJS()
    }),
    dispatch => ({
      ListActions: bindActionCreators(listActions, dispatch),
      InfoActions: bindActionCreators(infoActions, dispatch),
      FormActions: bindActionCreators(formActions, dispatch),
      GroupListActions: bindActionCreators(groupListActions, dispatch),
      GroupFormActions: bindActionCreators(groupFormActions, dispatch)
    })
  )
)(withRouter(Panel));
