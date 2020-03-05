import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
      align: "center",
      width: "100%"
    }
  },
  button: {
    margin: theme.spacing(4),
    width: "100%"
  }
}));

function DeleteProject() {
  const classes = useStyles();

  const projects = ["P1", "P2", "P3"];
  return (
    <div
      style={{
        width: "30%"
      }}
    >
      <Typography variant="h6" align="center">
        Delete Project
      </Typography>

      <FormControl component="fieldset" className={classes.formControl}>
        {projects.map(p => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<DeleteOutlinedIcon />}
                  checkedIcon={<DeleteIcon />}
                  value={p}
                />
              }
              label={p}
            />
          );
        })}
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save Changes
      </Button>
    </div>
  );
} //end DeleteProject

export default DeleteProject;
