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
      flag: true,
    };
  }

  componentDidMount() {
    let that = this;
    axios.get("http://localhost:3001/getallprojects?").then((response) => {
      that.setState({ projects: response.data });
    });
    this.setState({ flag: false });
  }

  render() {
    let projects = this.state.projects;
    return (
      <List>
        {projects.map((p) => {
          return (
            <Link
              key={p.name}
              to={{
                pathname: "/AllNotes",
                AllNotesProps: p.name,
                des: p.description,
              }}
              style={{ textDecoration: "none", color: "white" }}
              replace
            >
              <ListItem button key={p.name}>
                <ListItemIcon>
                  <LabelImportantIcon style={{ color: "#F5DA65" }} />
                </ListItemIcon>
                <ListItemText primary={p.name} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    );
  }
} //end GetAllProjects

export default GetAllProjects;
