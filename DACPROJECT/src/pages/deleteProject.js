import React from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

class DeleteProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      delete: [],
      alert: false,
      error: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    let that = this;
    axios.get("http://localhost:3001/getallprojects?").then((response) => {
      that.setState({ projects: response.data });
    });
  }

  handleClick() {
    console.log(this.state.delete);
    axios
      .put("http://localhost:3001/deleteprojects", {
        projects: this.state.delete,
      })
      .then((response) => {
        this.setState({ alert: true });
        if (response.status !== 200) this.setState({ error: true });
        console.log(response);
      });
    this.componentDidMount();
  }

  render() {
    if (this.state.projects.length > 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.state.alert && (
              <Alert
                severity={this.state.error ? "error" : "success"}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.setState({ alert: false });
                      this.props.updateKey(Math.random());
                    }}
                  >
                    CLOSE
                  </Button>
                }
              >
                {this.state.error
                  ? "Delete failed"
                  : "Successfully Deleted Projects!"}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5" align="center">
              Delete Project
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              {this.state.projects.map((p) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<DeleteOutlinedIcon />}
                        checkedIcon={<DeleteIcon />}
                        value={p.name}
                        key={p.name}
                      />
                    }
                    onChange={(event) => {
                      if (!this.state.delete.includes(event.target.value))
                        this.state.delete.push(event.target.value);
                      else this.state.delete.pop(event.target.value);
                    }}
                    label={p.name}
                    key={p.name}
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
              onClick={() => {
                this.handleClick();
              }}
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
