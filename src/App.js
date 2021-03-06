import React, { useState } from "react";
import "./App.css";
import TabsRouter from "./compoents/share/tabsrouter";
import WeatherChart from "./compoents/share/weater.chart";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [currentDay, setCurrentDay] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Router>
            <Switch>
              <TabsRouter {...{ setData, setCurrentDay }} />
            </Switch>
          </Router>
          <Divider variant="middle" classes={{ root: classes.divider }} />
          <WeatherChart
            {...{
              width: 740,
              height: 200,
              margin: { left: 60, right: 20, top: 30, bottom: 40 },
              data,
              currentDay
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
    marginTop: 10,
    marginBottom: 10
  }
}));

export default App;
