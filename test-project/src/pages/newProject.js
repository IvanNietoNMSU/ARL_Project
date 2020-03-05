import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
      align: "center",
      width: "100%"
    }
  },
  button: {
    margin: theme.spacing(4),
    width: "100%"
  }
}));

function NewProject() {
  const classes = useStyles();

  return (
    <div style={{ width: "30%" }} align="center">
      <Typography variant="h6" align="center">
        Create New Project
      </Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="title" label="Title" multiline />
        <TextField
          id="description"
          label="Description"
          multiline
          variant="outlined"
        />
      </form>

      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );
} //end NewProject

export default NewProject;
