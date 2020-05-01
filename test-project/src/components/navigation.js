import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import {
  AppBar,
  CssBaseline,
  Divider,
  Container,
  Drawer,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  List,
  makeStyles,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LoopIcon from "@material-ui/icons/Loop";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import GetAllProjects from "../scrypts/getProjects";
import banner from "../img/banner.jpg";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#414141",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#414141",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: "100%",
    padding: theme.spacing(3),
  },
  img: {
    backgroundColor: "black",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
  },
}));

function Navigation(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "black",
          backgroundImage: "url(" + banner + ")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Grid item xs={12}>
              <img alt="logo" height="55" src={require("../img/logo.jpg")} />
            </Grid>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "#F5DA65" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "#F5DA65" }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* Sync Notes Button */}
          <Link
            to="/SyncNotes"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem button key="Sync">
              <ListItemIcon>
                <LoopIcon style={{ color: "#F5DA65" }} />
              </ListItemIcon>
              <ListItemText primary="syncNotes" />
            </ListItem>
          </Link>

          {/* New Project Button */}
          <Link
            to="/NewProject"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem button key="newProject">
              <ListItemIcon>
                <AddIcon style={{ color: "#F5DA65" }} />
              </ListItemIcon>
              <ListItemText primary="New Project" />
            </ListItem>
          </Link>

          <Link
            to="/DeleteProject"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem button key="deleteProject">
              <ListItemIcon>
                <DeleteIcon style={{ color: "#F5DA65" }} />
              </ListItemIcon>
              <ListItemText primary="Delete Project" />
            </ListItem>
          </Link>

          {/*User button*/}
          <Link to="/User" style={{ textDecoration: "none", color: "white" }}>
            <ListItem button key="deleteProject">
              <ListItemIcon>
                <AccountCircleIcon style={{ color: "#F5DA65" }} />
              </ListItemIcon>
              <ListItemText primary="Delete Project" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        {/* Projects */}
        <GetAllProjects />
      </Drawer>
      <Container>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.main}
        </main>
      </Container>
    </div>
  );
}

export default Navigation;
