import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import { Table, ReadOnly } from "support/wrapper";
import { Codes } from "support/utils";
import { columns } from "./List.Header";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 600,
    padding: theme.spacing.unit,
    textAlign: "left"
  },
  listWrap: {
    clear: "both",
    paddingTop: theme.spacing.unit
  },
  infoActions: {
    marginTop: 2 * theme.spacing.unit
  },
  btnActions: {
    margin: theme.spacing.unit
  }
});

class List extends Component {
  state = {
    expanded: {}
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.list !== nextProps.list) return true;
    if (this.state.expanded !== nextState.expanded) return true;
    return false;
  }
  //===========================================================================

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
  handleExpandedChange = (newExpanded, index, event) => {
    this.setState({
      expanded: { [index]: newExpanded[index] }
    });
  };
  info = ({ original }) => {
    const { firstname, lastname, birthday, gender, phone, email } = original;
    const {
      classes,
      handleOpenEditForm,
      handleDeleteConfirm,
      genderCodes
    } = this.props;
    const { root, infoActions, btnActions } = classes;
    return (
      <Paper className={root}>
        <Grid container>
          <Grid item container xs={4} />
          <Grid item container xs={4} alignItems="flex-start">
            <Grid item xs={12}>
              <ReadOnly label="이름" value={firstname} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="생일" value={birthday} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="핸드폰" value={phone} />
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs={12}>
              <ReadOnly label="성" value={lastname} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="성별" value={Codes.label(genderCodes, gender)} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="이메일" value={email} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={infoActions}>
          <Grid item container xs={12} justify="center">
            <Button
              onClick={() => handleOpenEditForm(original)}
              variant="outlined"
              color="primary"
              className={btnActions}
            >
              수정
            </Button>
            <Button
              onClick={() => handleDeleteConfirm(original)}
              variant="outlined"
              className={btnActions}
            >
              삭제
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };
  //===========================================================================

  render() {
    const { handlePetchData, handleExpandedChange, info } = this;
    const { classes, list, pages, listLoading } = this.props;
    const { listWrap } = classes;

    return (
      <div className={listWrap}>
        <Table
          columns={columns}
          data={list.toJS()}
          pages={pages}
          loading={listLoading}
          onFetchData={handlePetchData}
          SubComponent={info}
          expanded={this.state.expanded}
          onExpandedChange={handleExpandedChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(List);
