import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

const Finding = (item) => {
  console.log(item);
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
            <Link
              to={{
                pathname: "/AddFinding",
                AddFindingProps: item.project,
                desc: item.item.description,
                title: item.item.title,
                pk: item.item.id,
                taskID: item.item.taskID,
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
            </Link>
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
