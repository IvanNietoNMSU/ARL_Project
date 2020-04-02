import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import axios from "axios";

export default class SyncNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: ""
    };
    this.callApi = this.callApi.bind(this);
  }

  callApi() {
    let that = this;
    console.log("Clicked!\n");
    axios
      .get("http://localhost:3001?do=getallprojects&name=test2")
      .then(response => {
        that.setState({ res: response.data });
      });
  }
  render() {
    return (
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography variant="h5">SyncNotes Page</Typography>
        </Grid>
      </Grid>
    );
  } //end SyncNotes
}
