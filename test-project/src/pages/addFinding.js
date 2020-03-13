import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
  const classes = useStyles();

  const handleClick = () => {
    axios
      .put(
        "http://localhost:3001?do=addfinding&projectname=" +
          props.location.AddFindingProps +
          "&name=" +
          title +
          "&desc=" +
          desc
      )
      .then(response => {
        console.log(response);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} align="left">
        <u>
          <Typography variant="h5">
            {props.location.AddFindingProps} Add Finding
          </Typography>
        </u>
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
} //end AllNotes

export default AddFinding;
