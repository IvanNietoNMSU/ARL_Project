import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import NotesSharpIcon from "@material-ui/icons/NotesSharp";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "20%",
    alignItems: "right"
  },
  columnmain: {
    flexBasis: "100%"
  },
  columnicon: {
    flexBasis: "8%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  dropdown: {
    alignItems: "center"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

const Items = props => {
  const classes = useStyles();
  const NoItems = [
    {
      type: "task",
      title:
        "Nothing found. Click 'Add Task' or 'Add Finding' to add something.",
      assignedTo: "",
      status: "",
      description: "None"
    }
  ];
  const [items, setItems] = useState(undefined); // fetchItems(props.name)
  const [flag, setFlag] = useState(false);

  if (!flag) {
    axios
      .get("http://localhost:3001/getentries?name=" + props.name)
      .then(response => {
        console.log(response.data);
        setItems(response.data);
      });
    setFlag(!flag);
  }
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
        items.map(item => {
          return (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <div className={classes.columnicon}>
                  {(() => {
                    if (item.type === "task") return <NoteOutlinedIcon />;
                    else return <NotesSharpIcon />;
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
                    <Paper
                      elevation={3}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}
                    >
                      <Grid item xs={12} align="right">
                        <Button
                          onClick={() => {}}
                          startIcon={<EditIcon />}
                          align="right"
                          variant="outlined"
                          color="default"
                          size="small"
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ padding: 20 }}>
                          {item.description}
                        </Typography>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
    </div>
  );
}; //end Item

export default Items;
