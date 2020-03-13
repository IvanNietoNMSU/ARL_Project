import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Items from "../components/item";

class AllNotes extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="left">
          <u>
            <Typography variant="h5">
              {this.props.location.AllNotesProps} All Notes
            </Typography>
          </u>
        </Grid>

        <Grid item xs={12}>
          {<Items target="all" />}
        </Grid>
      </Grid>
    );
  }
} //end AllNotes

export default AllNotes;
