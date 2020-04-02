import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
      align: "center",
      width: "50%"
    }
  },
  button: {
    margin: theme.spacing(4),
    width: "30%"
  }
}));

function AddFinding(props) {
  // eslint-disable-next-line
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    axios
      .put(
        "http://localhost:3001/addtask?projectname=" +
          props.location.AddFindingProps +
          "&name=" +
          title +
          "&desc=" +
          desc
      )
      .then(response => {
        setAlert(true);
        if (response.status !== 200) setError(true);
      });
  };
  if (props.location.AddFindingProps !== undefined)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="left">
          <Typography variant="h5">
            {props.location.AddFindingProps} Add Task
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {alert && (
            <Alert
              severity={error ? "error" : "success"}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    console.log("Clicked Closed!");
                    setAlert(false);
                  }}
                >
                  CLOSE
                </Button>
              }
            >
              {error ? "Insert failed" : "Successfully inseted task!"}
            </Alert>
          )}
        </Grid>

        <Grid item xs={12} align="center">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="title"
              label="Title"
              multiline
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              variant="outlined"
              value={desc}
              onChange={e => {
                setDesc(e.target.value);
              }}
            />
          </form>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleClick}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  else {
    history.push("/");
    return null;
  }
} //end AllNotes

export default AddFinding;
