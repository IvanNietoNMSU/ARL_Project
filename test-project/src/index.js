import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import TextEdit from "./components/texteditor";
import * as serviceWorker from "./serviceWorker";
import Navigation from "./components/navigation";
import AllNotes from "./pages/allnotes";
import { HashRouter, Route } from "react-router-dom";
import Home from "./pages/home";

// ReactDOM.render(
//   <Navigation main={<AllNotes />} />,
//   document.getElementById("root")
// );

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={() => <Navigation main={<AllNotes />} />} />
    <Route
      path="/textedit"
      component={() => <Navigation main={<TextEdit />} />}
    />
    <Route path="/home" component={() => <Navigation main={<Home />} />} />
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
