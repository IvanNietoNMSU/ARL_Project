import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { Link } from "react-router-dom";
import axios from "axios";

class GetAllProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      flag: true
    };
    this.callApi = this.callApi.bind(this);
  }

  callApi() {
    let that = this;
    console.log("Clicked!\n");
    axios
      .get("http://localhost:3001?do=getallprojects&name=test2")
      .then(response => {
        that.setState({ projects: response.data });
      });
    this.setState({ flag: false });
  }

  render() {
    if (this.state.flag) this.callApi();
    let projects = this.state.projects;
    return (
      <List>
        {projects.map(p => {
          return (
            <Link
              key={p}
              to={{
                pathname: "/AllNotes",
                AllNotesProps: p
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button key={p}>
                <ListItemIcon>
                  <LabelImportantIcon />
                </ListItemIcon>
                <ListItemText primary={p} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    );
  }
} //end GetAllProjects

export default GetAllProjects;
