import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function NoteItems(props) {
  const allItems = (
    <List dense="dense">
      <ListItem>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText
          primary="Single-line item"
          secondary={secondary ? "Secondary text" : null}
        />
      </ListItem>
    </List>
  );

  if (props.target === "all") return allItems;
  else return allItems;
} //end NoteItems

export default NoteItems;
