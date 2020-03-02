import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import NotesSharpIcon from "@material-ui/icons/NotesSharp";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";

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
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

function Items(props) {
  const classes = useStyles();
  let items = [];

  //Get all tasks for this project
  if (props.target === "all") {
    items = [
      {
        type: "task",
        title: "This is the title of the first task!",
        assignedTo: "Austin",
        status: "In Progress",
        description:
          "I've never done drugs, and though I've tasted alcohol, I've never had a whole drink. I don't even drink coffee. I had a small cup once--it was like drinking battery acid. I had to poop all morning. I once had a sniff of Scotch. I thought, I should be cleaning my sink with this stuff. But then the fire nation attacked."
      },
      {
        type: "finding",
        title: "This is the title of the finding!",
        assignedTo: "Aaron",
        status: "Complete",
        description:
          "We're like dogs on an acropolis. Trotting around with inexhaustible bladders and only too anxious to lift a leg against every statue. And mostly we succeed, Art, religion, heroism, love--we've left our visiting card on all of them. But death--death remains out of reach. We haven't been able to defile that statue. Not yet, at any rate, but progress is still progressing."
      },
      {
        type: "task",
        title: "This is the title of the first task!",
        assignedTo: "Ivan",
        status: "In Progress",
        description:
          '"So you think that money is the root of all evil?" said Francisco d\'Anconia. "Have you ever asked what is the root of money? Money is a tool of exchange, which can\'t exist unless there are goods produced and men able to produce them. Money is the material shape of the principle that men who wish to deal with one another must deal by trade and give value for value. Money is not the tool of the moochers, who claim your product by tears, or of the looters, who take it from you by force. Money is made possible only by the men who produce. Is this what you consider evil?'
      }
    ];
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

      {items.map(item => {
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
              <Typography>{item.description}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
} //end Item

export default Items;
