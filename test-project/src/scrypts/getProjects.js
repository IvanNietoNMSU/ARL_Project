import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";

function GetAllProjects() {
  let projects = ["P1", "P2"];

  return (
    <List>
      {projects.map(p => {
        return (
          <ListItem button key={p}>
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={p} />
          </ListItem>
        );
      })}
    </List>
  );
} //end GetAllProjects

export default GetAllProjects;
