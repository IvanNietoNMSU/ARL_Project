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
  const classes = useStyles();
  const history = useHistory();

  // const handleEditorChange = (content, editor) => {
  //   console.log("Content was updated:", content);
  // };

  const handleClick = () => {
    const taskid = props.location.taskID ? props.location.taskID : "0";
    axios
      .put("http://localhost:3001/addfinding", {
        projectname: props.location.AddFindingProps,
        name: title,
        desc: desc,
        taskid: taskid,
        pk: props.location.pk ? props.location.pk : -1,
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
              onBlur={(event, editor) => {
                console.log("Blur");
              }}
              onFocus={(event, editor) => {
                console.log("Focus");
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
        {/* {ReactHtmlParser(desc)} */}
      </Grid>
    );
  else {
    history.push("/");
    return null;
  }
} //end AllNotes

export default AddFinding;
