import React, { memo, useEffect, useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Tabs, Tab, Grid, AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { toLowerCaseAndRemoveSpaces, groupBy, processTemp } from "../utils";
import WeatherDay from "./weather.day";
import WeatherHours from "./weather.hours";
import { getWeather5Days } from "../../services/weather.serv";
import moment from "moment";
import { Divider } from "@material-ui/core";

const getMinAndMaxTemp = hours => {
  hours = hours.sort(
    ({ main: { temp_max: aMax } }, { main: { temp_max: bMax } }) => {
      return aMax - bMax;
    }
  );
  return {
    temp_min: hours[0].main.temp_max,
    temp_max: hours[hours.length - 1].main.temp_max
  };
};
const getWeather5DaysFromApi = async () => {
  let weatherDays = await getWeather5Days();
  const { cod, list, city } = await weatherDays.json();
  const processValue = value => {
    return moment(value).format("dddd");
  };
  if (cod === "200") {
    let days = groupBy(list, "dt_txt", processValue);
    days = Object.keys(days).map(label => {
      const {
        weather: [{ main }]
      } = days[label][0];
      const hours = days[label];
      const { temp_min, temp_max } = getMinAndMaxTemp(hours);
      if (hours.length < 8) {
        const diff = 8 - hours.length;
        for (let i = 0; i < diff; i++) {
          hours.push(hours[hours.length - 1]);
        }
      }
      return {
        label,
        to: `/${toLowerCaseAndRemoveSpaces(label)}`,
        render: props => (
          <WeatherHours
            {...{ main, temp_min, temp_max, label, hours, city, ...props }}
          />
        ),
        temp_min: processTemp(temp_min),
        temp_max: processTemp(temp_max),
        main
      };
    });
    return days;
  }
  return [];
};
function TabsRouter(props) {
  const { variant, onChange, hasData = true } = props;
  const [tabs, setTabs] = useState([]);
  const [city, setCity] = useState("3873544");
  // console.log("this.props.match.params.redirectParam", props);
  useEffect(() => {
    async function getDays() {
      const days5 = await getWeather5DaysFromApi();
      setTabs(days5);
    }
    getDays();
  }, city);

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Route>
          {({ location, match }) => {
            const currentLocation = location.pathname;
            const tabRoute = route =>
              route && `${match.url !== "/" ? match.url : ""}${route}`;
            return (
              <div className={classes.root}>
                <Switch>
                  {tabs.map(({ render, to, ...rest }, i) => (
                    <Route
                      key={i}
                      render={_props => (
                        <>
                          {hasData ? (
                            <>{render({ ..._props, ...rest, setCity })}</>
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
                  <Redirect to={tabRoute((tabs[0] || {}).to || "/wednesday")} />
                  ;
                </Switch>
                <Divider classes={{ root: classes.divider }} />
                <AppBar
                  position="static"
                  color="transparent"
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
                    {tabs.map(({ label, to, ...rest }, index) => (
                      <Tab
                        data-cy={`tab-${toLowerCaseAndRemoveSpaces(label)}`}
                        to={tabRoute(to)}
                        value={tabRoute(to)}
                        key={label}
                        label={<WeatherDay {...{ label, ...rest }} />}
                        component={Link}
                        className={classes.tabButton}
                        tabIndex={index}
                      />
                    ))}
                  </Tabs>
                </AppBar>
              </div>
            );
          }}
        </Route>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent",
    flexGrow: 1,
    margin: "0px 15px 0px"
  },
  shadowTabs: {
    boxShadow: "none"
  },
  tabButton: {
    "&:focus": {
      outline: "none"
    },
    width: 80
  },
  noData: {
    textAlign: "center",
    height: "300px",
    paddingTop: "20px"
  },
  divider: {
    backgroundColor: "gray",
    marginBottom: 50
  }
}));
export default withRouter(memo(TabsRouter));
