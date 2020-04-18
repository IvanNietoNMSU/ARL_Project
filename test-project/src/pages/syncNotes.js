import React from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DescriptionIcon from "@material-ui/icons/Description";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
export default class SyncNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "contained",
      server: "outlined",
      disabled: false,
      projects: [],
      delete: [],
      ip: "",
      port: "",
      error: false,
      alert: false,
    };
  }

  sync() {
    const address =
      this.state.client === "contained" ? "syncdata_client" : "syncdata_server";
    axios
      .put("http://localhost:3001/" + address, {
        project: this.state.delete[0],
        ip: this.state.ip,
        port: this.state.port,
      })
      .then((response) => {
        this.setState({ alert: true });
        if (response.status !== 200) this.setState({ error: true });
        console.log(response);
        this.setState({ disabled: false });
      });
  }

  componentDidMount() {
    let that = this;
    axios.get("http://localhost:3001/getallprojects?").then((response) => {
      that.setState({ projects: response.data });
    });
  }

  handleClick(clicked) {
    if (clicked === "client" && this.state.client === "outlined") {
      this.setState({ client: "contained", server: "outlined" });
    } else if (this.state.server === "outlined") {
      this.setState({ client: "outlined", server: "contained" });
    }
  }

  render() {
    return (
      <Grid container align="center" spacing={3}>
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
                ? "Sync failed"
                : "Successfully Synced" + this.state.delete}
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Sync Project</Typography>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          <Grid item xs={6} align="right">
            <Button
              variant={this.state.client}
              size="large"
              disabled={this.state.disabled}
              color="primary"
              onClick={() => {
                this.handleClick("client");
              }}
            >
              Client
            </Button>
          </Grid>
          <Grid item xs={6} align="left">
            <Button
              variant={this.state.server}
              disabled={this.state.disabled}
              size="large"
              color="primary"
              onClick={() => {
                this.handleClick("client");
              }}
            >
              Server
            </Button>
          </Grid>
          <Grid item container xs={12} justify="center">
            <form noValidate autoComplete="off">
              {this.state.server === "contained" && (
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    disabled={this.state.disabled}
                    label="IP"
                    onChange={(e) => {
                      this.setState({ ip: e.target.value });
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  disabled={this.state.disabled}
                  label="PORT"
                  onChange={(e) => {
                    this.setState({ port: e.target.value });
                  }}
                />
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              {this.state.projects.map((p) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<DescriptionOutlinedIcon />}
                        checkedIcon={<DescriptionIcon />}
                        disabled={this.state.disabled}
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                this.setState({ disabled: !this.state.disabled });
                this.sync();
              }}
            >
              Sync
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  } //end SyncNotes
}
