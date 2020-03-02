import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/navigation";
import TextEdit from "./components/texteditor";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    // <main>
    //   <Switch>
    //     <Route path="/" extract component={() => <Navigation main={<Home/>}/>} exact />
    //     <Route path="/Nav" component={() => <Navigation main={<TextEdit/>}/>} />
    //   </Switch>
    // </main>
  );
}

export default App;

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
