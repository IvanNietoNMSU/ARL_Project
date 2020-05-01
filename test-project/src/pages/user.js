import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      alert: false,
      error: false,
    };
  }

  componentDidMount() {
    let that = this;
    axios.get("http://localhost:3001/getusers").then((response) => {
      console.log(response.data);
      that.setState({ users: response.data });
    });
  }

  handleClick() {
    axios
      .put("http://localhost:3001/adduser", {
        username: this.state.username,
      })
      .then((response) => {
        this.setState({ alert: true });
        if (response.status !== 200) this.setState({ error: true });
      });
  }

  render() {
    return (
      <Grid container spacing={3}>
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
                  }}
                >
                  CLOSE
                </Button>
              }
            >
              {this.state.error
                ? "User Creation failed"
                : "Successfully Created User!"}
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Add Users
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              label="Username"
              multiline
              value={this.state.username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            />
          </form>
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
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }
} //end class
export default User;
