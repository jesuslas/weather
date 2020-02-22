import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { processTemp, getTime, getIconWeather, traslateDay } from "../utils";

function WeatherHours(props) {
  const { label, temp_min = 0, temp_max = 10, main, hours, city } = props;

  const classes = useStyles();
  return (
    <Grid container className={classes.day}>
      <Grid item xs={12}>
        <div className={classes.label}>{city.name}</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.labelDay}>{traslateDay(label)}</div>
      </Grid>
      <Grid container item>
        <Grid item lg={5} xs={2} />
        <Grid item lg={1} xs={3}>
          <Avatar
            classes={{ root: classes.avatarBig }}
            src={getIconWeather(main)}
          />
        </Grid>
        <Grid item lg={1} xs={3}>
          <div className={classes.tempDay}>
            {(
              (parseInt(processTemp(temp_min)) +
                parseInt(processTemp(temp_max))) /
              2
            ).toFixed(0)}
            °
          </div>
        </Grid>
        <Grid item lg={5} xs={4} />
      </Grid>
      <Grid container>
        <Grid item lg={2} xs={1} />
        <Grid item lg={8} xs={10}>
          <List className={`${classes.list} listMobile`}>
            {(hours || []).map(
              ({ dt_txt, main: { temp }, weather: [{ main: _main }] }, i) => (
                <ListItem key={i}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <div className={classes.label}>{getTime(dt_txt)}</div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.imageItem}>
                        <Avatar
                          classes={{ root: classes.avatarSmall }}
                          src={getIconWeather(
                            _main,
                            getTime(dt_txt).split(":")[0]
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <div className={classes.temp}>{processTemp(temp)}°</div>
                    </Grid>
                  </Grid>
                </ListItem>
              )
            )}
          </List>
        </Grid>
        <Grid item lg={2} xs={1} />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  day: {
    height: "auto",
    color: "#fff",
    fontFamily: "Calibri"
  },
  item: {
    textAlign: "center"
  },
  image: {
    width: 20
  },
  list: {
    display: "flex",
    padding: 0
  },
  label: {
    color: "#fff",
    fontFamily: "Calibri",
    fontSize: 20,
    textAlign: "center"
  },
  labelDay: {
    color: "#fff",
    fontFamily: "Calibri",
    textAlign: "center",
    fontSize: 50
  },
  tempDay: {
    color: "#fff",
    fontFamily: "Calibri",
    textAlign: "center",
    fontSize: 90
  },
  listText: {
    colot: "#fff"
  },
  avatarSmall: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginLeft: 5
  },
  avatarBig: {
    width: 65,
    height: 65,
    marginTop: 25,
    marginLeft: 25
  }
}));
export default memo(WeatherHours);
