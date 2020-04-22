import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import TextEdit from "./components/texteditor";
import Navigation from "./components/navigation";
import AllNotes from "./pages/allnotes";
import Home from "./pages/home";
import SyncNotes from "./pages/syncNotes";
import NewProject from "./pages/newProject";
import DeleteProject from "./pages/deleteProject";
import AddFinding from "./pages/addFinding";
import AddTask from "./pages/addTask";

function App() {
  const [Key, setKey] = useState(Math.random());

  return (
    <main>
      <HashRouter forceRefresh={true}>
        <Navigation
          key={Key}
          main={
            <Switch>
              <Route exact path="/" extract component={Home} />
              <Route exact path="/Nav" component={TextEdit} />
              <Route exact path="/SyncNotes" component={SyncNotes} />
              <Route
                exact
                path="/DeleteProject"
                component={() => <DeleteProject updateKey={setKey} />}
              />
              <Route
                exact
                path="/NewProject"
                component={() => <NewProject updateKey={setKey} />}
              />
              <Route exact path="/AllNotes" component={AllNotes} />
              <Route exact path="/AddFinding" component={AddFinding} />
              <Route exact path="/AddTask" component={AddTask} />
            </Switch>
          }
        />
      </HashRouter>
    </main>
  );
}

export default App;
