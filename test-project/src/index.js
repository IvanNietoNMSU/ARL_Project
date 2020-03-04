import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(
//   <HashRouter>
//     <div>
//       <Route
//         path="/Home"
//         component={() => <Navigation main={<AllNotes />} />}
//       />
//       <Route
//         path="/textedit"
//         component={() => <Navigation main={<TextEdit />} />}
//       />
//       <Route exact path="/" component={() => <Navigation main={<Home />} />} />
//     </div>
//   </HashRouter>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
