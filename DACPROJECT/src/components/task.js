import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Finding from "./finding";

const Task = (item, project) => {
  const [flag, setFlag] = useState(true);
  const [items, setItems] = useState();
  const getFindings = (item) => {
    setFlag(false);
    axios
      .get("http://localhost:3001/findingsoftask", {
        params: {
          name: item.project,
          taskid: item.item.id,
        },
      })
      .then((response) => {
        if (response.status !== 200) console.log("error");
        for (let i = 0; response.data[i]; i++)
          response.data[i] = {
            ...response.data[i],
            project: item.project,
            taskID: item.item.id,
            alert: item.item.alert,
          };
        setItems(response.data);
      });
  };

  if (flag) getFindings(item);

  return (
    <Fragment>
      <Grid item container xs={12} align="right">
        <Grid item xs={12}>
          <Link
            to={{
              pathname: "/AddFinding",
              AddFindingProps: item.project,
              taskID: item.item.id,
            }}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Button
              onClick={() => {}}
              startIcon={<EditIcon />}
              align="right"
              key={"finding" + item.item.title}
              variant="outlined"
              color="default"
              size="small"
              style={{ backgroundColor: "#f1f3f5" }}
            >
              Add Finding
            </Button>
          </Link>
          <Link
            to={{
              pathname: "/AddTask",
              AddFindingProps: item.project,
              ...item,
            }}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Button
              onClick={() => {}}
              startIcon={<EditIcon />}
              align="right"
              key={"edit" + item.item.title}
              variant="outlined"
              color="default"
              size="small"
              style={{ backgroundColor: "#f1f3f5" }}
            >
              Edit Task
            </Button>
          </Link>
          <Button
            key={item.item.id + item.item.project + "delete"}
            onClick={() => {
              item.item.alert({ type: item.item.type, id: item.item.id });
            }}
            startIcon={<DeleteIcon />}
            align="right"
            variant="outlined"
            color="default"
            size="small"
            style={{ backgroundColor: "#f1f3f5" }}
          >
            Delete Task
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{ padding: 20 }}
          variant="subtitle2"
          color="textSecondary"
        >
          {item.item.description}
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ExpansionPanel disabled>
            <ExpansionPanelSummary
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Grid item xs={8}>
                <Typography variant="h5">Title</Typography>
              </Grid>
              <Grid item xs={2} style={{ alignItems: "right" }}>
                <Typography variant="h5">Assigné</Typography>
              </Grid>
              <Grid item xs={2} style={{ alignItems: "right" }}>
                <Typography variant="h5">Status</Typography>
              </Grid>
              <Grid item xs={1}></Grid>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </Grid>
        {!!Array.isArray(items) &&
          items.map((item) => {
            return (
              <Grid item xs={12}>
                <ExpansionPanel key={item.id + item.title}>
                  <ExpansionPanelSummary
                    key={item.id + item.title}
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <Grid item xs={8}>
                      <Typography>{item.title}</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ alignItems: "right" }}>
                      <Typography>{item.assignedTo}</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ alignItems: "right" }}>
                      <Typography>{item.status}</Typography>
                    </Grid>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <Finding
                      item={item}
                      key={item.id + item.title}
                      project={item.project}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            );
          })}
      </Grid>
    </Fragment>
  );
};

export default Task;
