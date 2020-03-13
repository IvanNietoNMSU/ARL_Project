import React, { Fragment, useState } from "react";
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
  const classes = useStyles();

  const handleClick = () => {
    console.log("Clicked!\n");
    axios
      .get("http://localhost:3001?do=createproject&name=" + title)
      .then(response => {
        console.log(response);
      });
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
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
