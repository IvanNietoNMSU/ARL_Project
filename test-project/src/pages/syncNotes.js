import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";

const callApi = () => {
  console.log("Clicked!\n");
  axios.get("http://localhost:3001").then(response => console.log(response));
};

function SyncNotes() {
  return (
    <Grid container align="center">
      <Grid item xs={12}>
        <Typography variant="h5">SyncNotes Page</Typography>
      </Grid>
      {/* <Grid item xs={12}>
        <SimpleModal />
      </Grid> */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={callApi}
        >
          Call Api
        </Button>
      </Grid>
    </Grid>
  );
} //end SyncNotes

export default SyncNotes;
