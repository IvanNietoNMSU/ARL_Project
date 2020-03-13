import React from "react";
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
    axios.get("http://localhost:3001/getallprojects?").then(response => {
      that.setState({ projects: response.data });
    });
    this.setState({ flag: false });
  }

  render() {
    if (this.state.flag) this.callApi();
    let projects = this.state.projects;
    if (projects.length > 0) {
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
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h5" align="center">
              Delete Project
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Typography variant="h6" color="textSecondary">
              Nothing to delete
            </Typography>
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
  }
} //end DeleteProject

export default DeleteProject;
