import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import Items from "../components/item";

function AllNotes(props) {
  return (
    <div>
      <div>
        <u>
          <Typography variant="h2">All Notes</Typography>
        </u>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {<Items target="all" />}
        </Grid>
      </Grid>
    </div>
  );
} //end AllNotes

export default AllNotes;
