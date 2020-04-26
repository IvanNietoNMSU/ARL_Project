import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LoopIcon from "@material-ui/icons/Loop";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MenuIcon from "@material-ui/icons/Menu";

function Home() {
  return (
    <Grid container align="center" spacing={3}>
      <Grid item container xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography>
            To create a new project click the{" "}
            {<AddIcon style={{ color: "#F5DA65" }} />} icon
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            To delete a project click the{" "}
            {<DeleteIcon style={{ color: "#F5DA65" }} />} icon
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            To sync a project with another user on your local network click the{" "}
            {<LoopIcon style={{ color: "#F5DA65" }} />} icon
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            To view one of your projects click the corresponding{" "}
            {<LabelImportantIcon style={{ color: "#F5DA65" }} />} icon or click
            the {<MenuIcon style={{ color: "#F5DA65" }} />} icon to see the full
            names of your projects.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
} //end Home

export default Home;
