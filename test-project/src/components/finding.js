import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import ReactHtmlParser from "react-html-parser";
const Finding = (item) => {
  return (
    <Grid item xs={12}>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Grid item container xs={12} align="right">
          <Grid item xs={12}>
            <Button
              key={item.item.id + item.item.project}
              onClick={() => {}}
              startIcon={<EditIcon />}
              align="right"
              variant="outlined"
              color="default"
              size="small"
              style={{ backgroundColor: "#f1f3f5" }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12}>
            {ReactHtmlParser(item.item.description)}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Finding;
