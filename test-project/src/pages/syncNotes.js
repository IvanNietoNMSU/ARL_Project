import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import SimpleModal from "../components/modal";

function SyncNotes() {
  return (
    <Grid container xs={12} align="center">
      <Grid item xs={12}>
        <Typography variant="h5">SyncNotes Page</Typography>
      </Grid>
      <Grid item xs={12}>
        <SimpleModal />
      </Grid>
    </Grid>
  );
} //end SyncNotes

export default SyncNotes;
