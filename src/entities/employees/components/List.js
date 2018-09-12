import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { ReactTableWrap, ReadOnly } from "support/wrapper";
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
  }
});

class List extends Component {
  render() {
    const { classes, list, pages, listLoading, onFetchData } = this.props;
    const { listWrap, root, infoActions } = classes;

    return (
      <div className={listWrap}>
        <ReactTableWrap
          columns={columns}
          data={list}
          pages={pages}
          loading={listLoading}
          onFetchData={onFetchData}
          SubComponent={({ row }) => {
            const { firstname, lastname, birthday, gender, phone, email } = row;
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
                      <ReadOnly label="성별" defaultValue={gender} />
                    </Grid>
                    <Grid item xs={12}>
                      <ReadOnly label="이메일" defaultValue={email} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="center"
                  xs={12}
                  className={infoActions}
                >
                  <Button variant="outlined">취소</Button>
                  <Button variant="outlined" color="primary">
                    저장
                  </Button>
                </Grid>
              </Paper>
            );
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(List);
