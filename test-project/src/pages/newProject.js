import React, { Fragment, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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

function NewProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    axios
      .put(
        "http://localhost:3001/createproject?do=createproject&name=" +
          title +
          "&description=" +
          desc
      )
      .then(response => {
        setAlert(true);
        if (response.status !== 200) setError(true);
      });
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
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
              {error ? "Creation failed" : "Successfully Created Project!"}
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Create New Project
          </Typography>
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
            startIcon={<SaveIcon />}
            onClick={handleClick}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
} //end NewProject

export default NewProject;
