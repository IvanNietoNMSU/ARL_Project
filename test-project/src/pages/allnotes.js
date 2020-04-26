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
    };
    this.handleClickExport = this.handleClickExport.bind(this);
  }

  handleClickExport() {
    axios
      .put("http://localhost:3001/exportproject", {
        name: this.props.location.AllNotesProps,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ alert: true });
        if (response.data.status !== 200) this.setState({ error: true });
      });
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {!!this.state.alert && (
            <Alert
              severity={this.state.error ? "error" : "success"}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({ alert: false });
                  }}
                >
                  CLOSE
                </Button>
              }
            >
              {this.state.error
                ? "Export failed"
                : "Successfully Exported Project!"}
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
          />
        </Grid>
      </Grid>
    );
  }
} //end AllNotes

export default AllNotes;
