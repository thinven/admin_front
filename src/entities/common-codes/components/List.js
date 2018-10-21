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
  //===========================================================================

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.list !== nextProps.list) return true;
    if (this.state.expanded !== nextState.expanded) return true;
    return false;
  }
  //===========================================================================

  handlePetchData = (state, instance) => {
    const { Actions } = this.props;
    Actions.loadCommonCodes();
    Actions.getCommonCodes(
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
    const { commonCodeGroup, code, name, ordered, use } = original;
    const {
      classes,
      handleOpenEditForm,
      handleOpenGroupForm,
      useCodes
    } = this.props;
    const { root, infoActions, btnActions } = classes;
    return (
      <Paper className={root}>
        <Grid container>
          <Grid item container xs={4} />
          <Grid item container xs={4} alignItems="flex-start">
            <Grid item xs={12}>
              <ReadOnly label="공통코드그룹명" value={commonCodeGroup.name} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="코드" value={code} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="표시순서" value={ordered} />
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs={12}>
              <ReadOnly
                label="그룹사용여부"
                value={Codes.label(useCodes, commonCodeGroup.use)}
              />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="코드명" value={name} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="사용여부" value={Codes.label(useCodes, use)} />
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
              코드수정
            </Button>
            <Button
              onClick={() => handleOpenGroupForm(original)}
              variant="outlined"
              className={btnActions}
            >
              그룹수정
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };
  //===========================================================================

  render() {
    const { handlePetchData, handleExpandedChange, info } = this;
    const { classes, list, pages, listLoading, useCodes } = this.props;
    const { listWrap } = classes;

    return (
      <div className={listWrap}>
        <Table
          ref={ref => (this._table = ref)}
          columns={columns(useCodes)}
          data={list}
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
