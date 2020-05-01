import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CKEditor from "@ckeditor/ckeditor5-react";
import config from "../scrypts/editorConfig";
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
  // eslint-disable-next-line
  const [title, setTitle] = useState(
    props.location.title ? props.location.title : ""
  );
  const [desc, setDesc] = useState(
    props.location.desc ? props.location.desc : "<p></p>"
  );
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [assigne, setAssigne] = useState(props.location.assigne);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(props.location.status);
  const [open2, setOpen2] = useState(false);
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(true);

  const handleChange = (event) => {
    setAssigne(event.target.value);
  };

  const handleChange2 = (event) => {
    setStatus(event.target.value);
  };

  const classes = useStyles();
  const history = useHistory();

  const getUsers = () => {
    setFlag(false);
    axios.get("http://localhost:3001/getusers").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  if (flag) getUsers();

  const handleClick = () => {
    const taskid = props.location.taskID ? props.location.taskID : "0";
    axios
      .put("http://localhost:3001/addfinding", {
        projectname: props.location.AddFindingProps,
        name: title,
        desc: desc,
        taskid: taskid,
        pk: props.location.pk ? props.location.pk : -1,
        assigne: assigne ? assigne : "none",
        status: status ? status : "To Do",
      })
      .then((response) => {
        setAlert(true);
        if (response.status !== 200) setError(true);
      });
  };

  if (props.location.AddFindingProps !== undefined)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="left">
          <Typography variant="h5">
            {props.location.AddFindingProps} / Add Finding
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
                    setAlert(false);
                  }}
                >
                  CLOSE
                </Button>
              }
            >
              {error ? "Insert failed" : "Successfully inseted Finding!"}
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
        <Grid item xs={12}>
          <CKEditor
            editor={config}
            data={desc}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!");
            }}
            onChange={(event, editor) => {
              setDesc(editor.getData());
            }}
          />
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
        {/* {ReactHtmlParser(desc)} */}
      </Grid>
    );
  else {
    history.push("/");
    return null;
  }
} //end AllNotes

export default AddFinding;
