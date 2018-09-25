import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import { Table, ReadOnly } from "support/wrapper";
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
  info = ({ original, row }) => {
    const { firstname, lastname, birthday, gender, phone, email } = row;
    const { classes, onEditForm, onDeleteConfirm, genderCodes } = this.props;
    const { root, infoActions, btnActions } = classes;
    return (
      <Paper className={root}>
        <Grid container>
          <Grid item container xs={4} />
          <Grid item container xs={4} alignItems="flex-start">
            <Grid item xs={12}>
              <ReadOnly label="이름" defaultValue={firstname} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="생일" defaultValue={birthday} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="핸드폰" defaultValue={phone} />
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs={12}>
              <ReadOnly label="성" defaultValue={lastname} />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly
                label="성별"
                defaultValue={
                  genderCodes.filter(code => code.value * 1 === gender)[0].label
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ReadOnly label="이메일" defaultValue={email} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={infoActions}>
          <Grid item container xs={12} justify="center">
            <Button
              onClick={() => onEditForm(original)}
              variant="outlined"
              color="primary"
              className={btnActions}
            >
              수정
            </Button>
            <Button
              onClick={() => onDeleteConfirm(original)}
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
    const { classes, list, pages, listLoading, onFetchData } = this.props;
    const { listWrap } = classes;

    return (
      <div className={listWrap}>
        <Table
          columns={columns}
          data={list}
          pages={pages}
          loading={listLoading}
          onFetchData={onFetchData}
          SubComponent={this.info}
        />
      </div>
    );
  }
}

export default withStyles(styles)(List);
