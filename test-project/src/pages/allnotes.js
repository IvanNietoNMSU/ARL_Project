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
      <div>
        <div>
          <u>
            <Typography variant="h2">
              {this.props.location.AllNotesProps} All Notes
            </Typography>
          </u>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {<Items target="all" />}
          </Grid>
        </Grid>
      </div>
    );
  }
} //end AllNotes

export default AllNotes;
