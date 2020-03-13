import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Items from "../components/item";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class AllNotes extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} align="left">
          <u>
            <Typography variant="h5">
              {this.props.location.AllNotesProps} All Notes
            </Typography>
          </u>
        </Grid>

        <Grid item xs={6} align="right">
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Link
                to={{
                  pathname: "/AddFinding",
                  AddFindingProps: this.props.location.AllNotesProps
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button variant="contained" color="primary" size="small">
                  Add Finding
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.handleClickFinding}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {<Items target="all" />}
        </Grid>
      </Grid>
    );
  }
} //end AllNotes

export default AllNotes;
