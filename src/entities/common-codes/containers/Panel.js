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

import * as groupListActions from "entities/common-code-groups/store/list";

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
    FormActions.loadCommonCode({
      info: original
    });
    handleConfirm({
      title: "삭제 알림",
      desc: original.id + "님을 삭제 하시겠습니까?",
      onOk: async () => {
        try {
          await FormActions.delCommonCode(original);
          ListActions.delCommonCode(original);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  //===========================================================================

  render() {
    const {
      FormActions,
      ListActions,
      GroupListActions,
      classes,
      form,
      groupList,
      list,
      pages,
      loading,
      useCodes
    } = this.props;
    const { contentWrap } = classes;
    const { handleOpenForm, handleOpenEditForm, handleDeleteConfirm } = this;
    return (
      <section className={contentWrap}>
        <Header onOpenForm={handleOpenForm} />
        <List
          list={list}
          pages={pages}
          useCodes={useCodes}
          listLoading={loading}
          ListActions={ListActions}
          onEditForm={handleOpenEditForm}
          onDeleteConfirm={handleDeleteConfirm}
        />
        <Form
          innerRef={node => (this._form = node)}
          form={form}
          useCodes={useCodes}
          groupList={groupList}
          FormActions={FormActions}
          GroupListActions={GroupListActions}
        />
      </section>
    );
  }
}

export default compose(
  withStyles(styles, { name: "Panel" }),
  connect(
    ({ commonCodeList, commonCodeForm, commonCodeGroupList }) => ({
      list: commonCodeList.get("list").toJS(),
      useCodes: commonCodeList.get("useCodes").toJS(),
      pages: commonCodeList.get("pages"),
      loading: commonCodeList.get("loading"),
      groupList: commonCodeGroupList.get("list").toJS(),
      form: commonCodeForm.get("form").toJS(),
      info: commonCodeForm.get("info").toJS(),
      result: commonCodeForm.get("result").toJS()
    }),
    dispatch => ({
      ListActions: bindActionCreators(listActions, dispatch),
      FormActions: bindActionCreators(formActions, dispatch),
      InfoActions: bindActionCreators(infoActions, dispatch),
      GroupListActions: bindActionCreators(groupListActions, dispatch)
    })
  )
)(withRouter(Panel));
