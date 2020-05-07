import React from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Items from "../components/item";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class AllNotes extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      error: false,
      delete: false,
      msg: "",
      severity: "success",
      target: {},
    };
    this.handleClickExport = this.handleClickExport.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  deleteProject() {
    console.log(this.state.target);
    axios
      .put("http://localhost:3001/deleteentry", {
        type: this.state.target.type,
        id: this.state.target.id,
        project: this.props.location.AllNotesProps,
      })
      .then((response) => {
        this.setState({ alert: true });
        if (response.data.status !== 200)
          this.setState({
            error: true,
            msg: "Delete Failed",
            severity: "error",
          });
        else this.setState({ msg: "Successfully Deleted Entry!" });
      })
      .catch(
        this.setState({
          error: true,
          msg: "Export Failed",
          severity: "error",
        })
      );
  }

  handleDeleteProject(e) {
    this.setState({
      alert: true,
      delete: true,
      msg: "Are you sure you want to delete this " + e.type + "?",
      severity: "warning",
      target: e,
    });
  }

  handleClickExport() {
    axios
      .put("http://localhost:3001/exportproject", {
        name: this.props.location.AllNotesProps,
      })
      .then((response) => {
        this.setState({ alert: true });
        if (response.data.status !== 200)
          this.setState({
            error: true,
            msg: "Export Failed",
            severity: "error",
          });
        else
          this.setState({
            msg: "Successfully Exported Project!",
            severity: "success",
            error: false,
          });
      })
      .catch(
        this.setState({
          error: true,
          msg: "Export Failed",
          severity: "error",
        })
      );
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {!!this.state.alert && (
            <Alert
              severity={this.state.severity}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    if (this.state.delete) this.deleteProject();
                    this.setState({
                      alert: false,
                      error: false,
                      delete: false,
                      msg: "",
                      severity: "success",
                    });
                  }}
                >
                  {this.state.delete ? "YES DELETE" : "CLOSE"}
                </Button>
              }
            >
              {this.state.msg}
            </Alert>
          )}
        </Grid>
        <Grid item xs={6} align="left">
          <Typography variant="h5">
            {this.props.location.AllNotesProps}
          </Typography>
        </Grid>
        {this.props.location.des && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              {this.props.location.des}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container item xs={12}>
            <Grid item xs={12} align="right">
              <Link
                to={{
                  pathname: "/AddFinding",
                  AddFindingProps: this.props.location.AllNotesProps,
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  style={{ backgroundColor: "#f1f3f5" }}
                >
                  Add Finding
                </Button>
              </Link>
              <Link
                to={{
                  pathname: "/AddTask",
                  AddFindingProps: this.props.location.AllNotesProps,
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={this.handleClickFinding}
                  style={{ backgroundColor: "#f1f3f5" }}
                >
                  Add Task
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="small"
                onClick={this.handleClickExport}
                style={{ backgroundColor: "#f1f3f5" }}
              >
                Export Project
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Items
            target="all"
            name={this.props.location.AllNotesProps}
            props={this.props}
            key={this.props.location.AllNotesProps}
            alert={this.handleDeleteProject}
          />
        </Grid>
      </Grid>
    );
  }
} //end AllNotes

export default AllNotes;
