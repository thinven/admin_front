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
  state = {
    formOpen: false
  };
  //===========================================================================

  /**
   * 목록 관련 이벤트.
   */
  handlePetchData = (state, instance) => {
    const { ListActions } = this.props;
    ListActions.startLoading();
    ListActions.getCommonCodes(
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
    const { FormActions } = this.props;
    FormActions.initialize();
    this.setState({
      formOpen: true
    });
  };
  handleLoadOptions = async (inputValue, callback) => {
    const { GroupListActions } = this.props;
    try {
      await GroupListActions.getCommonCodeGroups({ name: inputValue });
      callback(
        this.props.groupList.map(group => ({
          value: group.uid,
          label: group.name
        }))
      );
    } catch (e) {
      console.log("handleLoadOptions catch", e);
    }
  };
  handleAutoCompleteChange = (name, val) => {
    const { FormActions } = this.props;
    FormActions.changeInput({ name: name + "n", value: val.label });
    FormActions.changeInput({ name: name + "u", value: val.value });
  };
  handleChangeInput = e => {
    const { FormActions } = this.props;
    const { name, value } = e.target;
    FormActions.changeInput({ name, value });
  };
  handleSubmit = async () => {
    const { form, FormActions, ListActions, onSendMsg } = this.props;
    try {
      if (form.uid) {
        await FormActions.patchCommonCode(form);
      } else {
        await FormActions.addCommonCode(form);
      }
      if (this.props.result.key === "SUCCESS") {
        if (form.uid) {
          ListActions.patchCommonCode(this.props.info);
        } else {
          ListActions.addCommonCode(this.props.info);
        }
        this.handleCloseForm();
      } else {
        onSendMsg(this.props.result);
      }
    } catch (e) {
      console.log("handleSubmit catch", e);
    }
  };
  handleCloseForm = () => {
    this.setState({ formOpen: false });
  };
  //===========================================================================

  /**
   * 수정폼 관련 이벤트.
   */
  handleOpenEditForm = original => {
    const { FormActions } = this.props;
    FormActions.loadCommonCode({
      info: original
    });
    this.setState({
      formOpen: true
    });
  };
  //===========================================================================

  /**
   * 삭제 관련 이벤트.
   */
  handleDeleteConfirm = original => {
    const { FormActions, ListActions, onConfirm } = this.props;
    FormActions.loadCommonCode({
      info: original
    });
    onConfirm({
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
    const { formOpen } = this.state;
    const { classes, form, list, pages, loading } = this.props;
    const { contentWrap } = classes;
    const {
      handlePetchData,
      handleOpenForm,
      handleChangeInput,
      handleSubmit,
      handleCloseForm,
      handleOpenEditForm,
      handleDeleteConfirm,
      handleLoadOptions,
      handleAutoCompleteChange
    } = this;
    return (
      <section className={contentWrap}>
        <Header onOpenForm={handleOpenForm} />
        <List
          list={list}
          pages={pages}
          listLoading={loading}
          onFetchData={handlePetchData}
          onEditForm={handleOpenEditForm}
          onDeleteConfirm={handleDeleteConfirm}
        />
        <Form
          form={form}
          formOpen={formOpen}
          onCloseForm={handleCloseForm}
          onSubmit={handleSubmit}
          onChangeInput={handleChangeInput}
          onLoadOptions={handleLoadOptions}
          onAutoCompleteChange={handleAutoCompleteChange}
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
      groupList: commonCodeGroupList.get("list").toJS(),
      pages: commonCodeList.get("pages"),
      loading: commonCodeList.get("loading"),
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
