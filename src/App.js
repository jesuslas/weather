import React from "react";
import "./App.css";
import TabsRouter from "./compoents/share/tabsrouter";
import WeatherChart from "./compoents/share/weater.chart";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Router>
            <Switch>
              <TabsRouter />
            </Switch>
          </Router>
          <Divider variant="middle" classes={{ root: classes.divider }} />
          <WeatherChart
            {...{
              width: 700,
              height: 200,
              margin: { left: 40, right: 20, top: 30, bottom: 40 }
            }}
          />
        </div>
      </header>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  divider: {
    backgroundColor: "gray",
    marginTop: 50,
    marginBottom: 50
  }
}));

export default App;
