import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import NotesSharpIcon from "@material-ui/icons/NotesSharp";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import Grid from "@material-ui/core/Grid";

import Finding from "./finding";
import Task from "./task";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "20%",
    alignItems: "right",
  },
  columnmain: {
    flexBasis: "100%",
  },
  columnicon: {
    flexBasis: "8%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  dropdown: {
    alignItems: "center",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Items = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState(undefined);
  const [project, setProject] = useState(props.name);
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  if (project !== props.name) {
    setProject(props.name);
    setFlag(false);
  }

  if (!flag && props.name !== undefined) {
    axios
      .get("http://localhost:3001/getentries?name=" + props.name)
      .then((response) => {
        for (let i = 0; response.data[i]; i++)
          response.data[i] = { ...response.data[i], project: props.name };
        setItems(response.data);
      });
    setFlag(!flag);
  }

  const body = (projectName) => {
    return (
      <div>
        <ExpansionPanel disabled>
          <ExpansionPanelSummary
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <div className={classes.columnicon}></div>
            <div className={classes.columnmain}>
              <Typography variant="h5">Title</Typography>
            </div>
            <div className={classes.column}>
              <Typography variant="h5">Assigné</Typography>
            </div>
            <div className={classes.column}>
              <Typography variant="h5">Status</Typography>
            </div>
            <div className={classes.columnicon}></div>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        {!!Array.isArray(items) &&
          items.map((item) => {
            return (
              <ExpansionPanel key={item.id + item.title}>
                <ExpansionPanelSummary
                  key={item.id + item.title}
                  expandIcon={<ExpandMoreIcon />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <div className={classes.columnicon}>
                    {(() => {
                      if (item.type === "task")
                        return <NoteOutlinedIcon key={item.id + item.title} />;
                      else return <NotesSharpIcon key={item.id + item.title} />;
                    })()}
                  </div>

                  <div className={classes.columnmain}>
                    <Typography className={classes.secondaryHeading}>
                      {item.title}
                    </Typography>
                  </div>

                  <div className={classes.column}>
                    <Typography>{item.assignedTo}</Typography>
                  </div>

                  <div className={classes.column}>
                    <Typography>{item.status}</Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container>
                    <Grid item xs={12}>
                      {item.type === "task" && (
                        <Task
                          item={item}
                          project={project}
                          key={item.id + item.title}
                        />
                      )}
                      {item.type === "finding" && (
                        <Finding
                          item={item}
                          key={item.id + item.title}
                          project={item.project}
                        />
                      )}
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
      </div>
    );
  };

  if (props.name !== undefined) return <Fragment>{body(project)}</Fragment>;
  else {
    history.push("/");
    return null;
  }
}; //end Item

export default Items;
