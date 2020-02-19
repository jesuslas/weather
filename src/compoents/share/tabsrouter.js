import React, { memo , useEffect, useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Tabs, Tab, Grid, AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toLowerCaseAndRemoveSpaces, groupBy, processTemp } from "../utils";
import WeatherDay from "./weather.day";
import WeatherHours from "./weather.hours";
import {getWeather5Days} from "../../services/weather.serv";
import moment from "moment";

const getWeather5DaysFromApi = async ()=>{
    let weatherDays = await getWeather5Days();
    const {cod, list } = await weatherDays.json()
    const processValue = (value) =>{
        return moment(value).format("dddd")
    }
    if(cod === "200"){
        let days = groupBy(list, "dt_txt", processValue);
        days = Object.keys(days).map(label=>{
          const {main:{temp_min,temp_max},weather:[{ main }]} = days[label][0];
          const hours = days[label];
          return (
          {
            label,
            to: `/${toLowerCaseAndRemoveSpaces(label)}`,
            render:(_props)=>( <WeatherHours {...{temp_min,temp_max,label,hours}}/>),
            temp_min: processTemp(temp_min),
            temp_max: processTemp(temp_max),
            main
          })
        })
          return days
    }
   return []
}
  function TabsRouter(props) {
  const {
    variant,
    onChange,
    hasData = true,
  } = props;
  const [tabs, setTabs] = useState([]);

  useEffect(
    () => {
        async function getDays(){
            const days5 = await getWeather5DaysFromApi()
            setTabs(days5)
        } ;
        getDays()
    },
    []
  );

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Route>
          {({ location, match }) => {
            const currentLocation = location.pathname;
            const tabRoute = route => route && `${match.url !== "/"?match.url:""}${route}`;
            return (
              <div className={classes.root}>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.shadowTabs}
                >
                  <Tabs
                    value={currentLocation}
                    indicatorColor="primary"
                    textColor="primary"
                    centered={!variant}
                    onChange={onChange}
                    variant={variant}
                    scrollButtons="on"
                  >
                    {tabs.map(({ label, to, ...rest}, index) => (
                      <Tab
                        data-cy={`tab-${toLowerCaseAndRemoveSpaces(label)}`}
                        to={tabRoute(to)}
                        value={tabRoute(to)}
                        key={label}
                        label={<WeatherDay {...{ label, ...rest}}/>}
                        component={Link}
                        className={classes.tabButton}
                        tabIndex={index}
                      >
                      </Tab>
                    ))}
                  </Tabs>
                </AppBar>
                <Switch>
                  {tabs.map(({ render, to, ...rest }, i) => (
                    
                    <Route
                      key={i}
                      render={_props => (
                     <>
                          { hasData ? (
                            <>{render({..._props,...rest, uno:"dos"})}</>
                          ) : (
                            <div className={classes.noData}>
                              <Typography>No data to display</Typography>
                            </div>
                          )}
                     </>     
                      )}
                      path={tabRoute(to)}
                    />
                  ))}
                  <Redirect to={tabRoute((tabs[0]||{}).to || "/wednesday")} />;
                </Switch>
              </div>
            );
          }}
        </Route>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    margin: "0px 15px 0px"
  },
  shadowTabs: {
    boxShadow: "none"
  },
  tabButton: {
    "&:focus": {
      outline: "none"
    }
  },
  noData: {
    textAlign: "center",
    height: "300px",
    paddingTop: "20px"
  }
}));
export default memo(TabsRouter);
