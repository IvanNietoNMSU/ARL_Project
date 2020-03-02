import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import TextEdit from "./components/texteditor";
import * as serviceWorker from "./serviceWorker";
import Navigation from "./components/navigation";
import AllNotes from "./pages/allnotes";

ReactDOM.render(
  <Navigation main={<AllNotes />} />,
  document.getElementById("root")
);

// ReactDOM.render((
//     <Router>
//       <Route path="/" component={App} />
//     </Router>
//   ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
