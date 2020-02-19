import React from "react";
import "./App.css";
import TabsRouter from "./compoents/share/tabsrouter";
import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Router>
            <Switch>
              <TabsRouter />
            </Switch>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
