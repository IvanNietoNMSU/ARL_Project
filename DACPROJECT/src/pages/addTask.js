import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
      align: "center",
      width: "50%",
    },
  },
  button: {
    margin: theme.spacing(4),
    width: "30%",
  },
}));

function AddFinding(props) {
  const taskProps = props.location.item;
  // eslint-disable-next-line
  const [title, setTitle] = useState(taskProps ? taskProps.title : "");
  const [desc, setDesc] = useState(taskProps ? taskProps.description : "");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [assigne, setAssigne] = useState(
    taskProps ? taskProps.assignedTo : "none"
  );
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(taskProps ? taskProps.status : "To Do");
  const [open2, setOpen2] = useState(false);
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(true);
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event) => {
    setAssigne(event.target.value);
  };

  const handleChange2 = (event) => {
    setStatus(event.target.value);
  };

  const getUsers = () => {
    setFlag(false);
    axios.get("http://localhost:3001/getusers").then((response) => {
      setUsers(response.data);
    });
  };

  if (flag) getUsers();

  const handleClick = () => {
    const id = taskProps ? taskProps.id : -1;
    axios
      .put(
        "http://localhost:3001/addtask?projectname=" +
          props.location.AddFindingProps +
          "&name=" +
          title +
          "&desc=" +
          desc +
          "&assigne=" +
          assigne +
          "&status=" +
          status +
          "&id=" +
          id
      )
      .then((response) => {
        setAlert(true);
        if (response.status !== 200) setError(true);
      });
  };
  console.log(props);
  if (props.location.AddFindingProps !== undefined)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="left">
          <Typography variant="h5">
            {props.location.AddFindingProps} / Add Task
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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </form>
        </Grid>
        <Grid item xs={6} align="right">
          <InputLabel id="demo-controlled-open-select-label">
            Assigné
          </InputLabel>
          <NativeSelect
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            onOpen={() => {
              setOpen(true);
            }}
            value={assigne}
            onChange={(E) => {
              handleChange(E);
            }}
          >
            <option value="none">None</option>
            {users.map((e) => {
              return (
                <option key={e.userName} value={e.userName}>
                  {e.userName}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
        <Grid item xs={6} align="left">
          <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
          <NativeSelect
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open2}
            onClose={() => {
              setOpen2(false);
            }}
            onOpen={() => {
              setOpen2(true);
            }}
            value={status}
            onChange={(E) => {
              handleChange2(E);
            }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </NativeSelect>
        </Grid>
        <Grid item xs={12} align="center">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="description"
              label="Description"
              multiline
              variant="filled"
              value={desc}
              onChange={(e) => {
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
