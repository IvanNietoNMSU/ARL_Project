import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import TextEdit from "./components/texteditor";
import Navigation from "./components/navigation";
import AllNotes from "./pages/allnotes";
import Home from "./pages/home";
import SyncNotes from "./pages/syncNotes";
import NewProject from "./pages/newProject";
import DeleteProject from "./pages/deleteProject";
import AddFinding from "./pages/addFinding";

function App() {
  return (
    <main>
      <HashRouter forceRefresh={true}>
        <Navigation
          main={
            <Switch>
              <Route path="/" extract component={Home} exact />
              <Route path="/Nav" component={TextEdit} />
              <Route path="/SyncNotes" component={SyncNotes} />
              <Route path="/DeleteProject" component={DeleteProject} />
              <Route path="/NewProject" component={NewProject} />
              <Route path="/AllNotes" component={AllNotes} />
              <Route path="/AddFinding" component={AddFinding} />
            </Switch>
          }
        />
      </HashRouter>
    </main>
  );
}

// <Route
//   path="/NewProject"
//   component={() => <Navigation main={<NewProject />} />}
// />;

export default App;
