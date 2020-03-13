import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(4),
//       width: "100%"
//     }
//   },
//   button: {
//     margin: theme.spacing(4),
//     width: "30%"
//   }
// }));

function getProjects() {
  let anw = [];
  axios.get("http://localhost:3001?do=getallprojects").then(response => {
    console.log(response);
    return response.data;
  });
  return anw;
}

class DeleteProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      flag: true
    };
    this.callApi = this.callApi.bind(this);
  }
  callApi() {
    let that = this;
    console.log("Clicked!\n");
    axios
      .get("http://localhost:3001?do=getallprojects&name=test2")
      .then(response => {
        that.setState({ projects: response.data });
      });
    this.setState({ flag: false });
  }

  render() {
    if (this.state.flag) this.callApi();
    let projects = this.state.projects;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h5" align="center">
            Delete Project
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            {projects.map(p => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<DeleteOutlinedIcon />}
                      checkedIcon={<DeleteIcon />}
                      value={p}
                      key={p}
                    />
                  }
                  label={p}
                  key={p}
                />
              );
            })}
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    );
  }
} //end DeleteProject

export default DeleteProject;
