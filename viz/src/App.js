import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import DvrRoundedIcon from "@material-ui/icons/DvrRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import BookRoundedIcon from "@material-ui/icons/BookRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Introduction from "./Introduction";
import Methods from "./Methods";
import InteractiveSimulator from "./InteractiveSimulator";
import Results from "./Results";
import Credits from "./Credits";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pages = [
    {
      path: "/",
      title: "Introduction",
      icon: <DvrRoundedIcon />,
    },
    {
      path: "/methods",
      title: "Methods",
      icon: <AssignmentRoundedIcon />,
    },
    {
      path: "/results",
      title: "Results",
      icon: <AssignmentTurnedInRoundedIcon />,
    },
    {
      path: "/interactive-model",
      title: "Interactive Model",
      icon: <AssessmentRoundedIcon />,
    },
    {
      path: "/credits",
      title: "Credits",
      icon: <BookRoundedIcon />,
    },
  ];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {pages.map((page) => (
          <Link
            to={page.path}
            key={page.title}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              COVIM
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={window.document.body}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path={pages[0].path}>
              <Introduction />
            </Route>
            <Route path={pages[1].path}>
              <Methods />
            </Route>
            <Route path={pages[2].path}>
              <Results />
            </Route>
            <Route path={pages[3].path}>
              <InteractiveSimulator />
            </Route>
            <Route path={pages[4].path}>
              <Credits />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
