import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { processTemp, getTime, getIconWeather, traslateDay } from "../utils";

function WeatherHours(props) {
  const { label, temp_min = 0, temp_max = 10, main, hours } = props;

  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.day}>
      <Grid item xs={12}>
        <div className={classes.labelDay}>{traslateDay(label)}</div>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={5} />
        <Grid item xs={12} sm={1}>
          <Avatar
            classes={{ root: classes.avatarBig }}
            src={getIconWeather(main)}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <div className={classes.tempDay}>
            {(
              (parseInt(processTemp(temp_min)) +
                parseInt(processTemp(temp_max))) /
              2
            ).toFixed(0)}
            °
          </div>
        </Grid>
        <Grid item xs={12} sm={5} />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <List className={classes.list}>
            {(hours || []).map(
              ({ dt_txt, main: { temp }, weather: [{ main: _main }] }, i) => (
                <ListItem key={i}>
                  <Grid container xs={12} spacing={0}>
                    <Grid item xs={12}>
                      <div className={classes.label}>{getTime(dt_txt)}</div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <div className={classes.imageItem}>
                        <Avatar
                          classes={{ root: classes.avatarSmall }}
                          sizes={10}
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
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  day: {
    height: "auto",
    padding: 10,
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
    marginLeft: 30
  },
  avatarBig: {
    width: 65,
    height: 65,
    marginTop: 25,
    marginLeft: 25
  }
}));
export default memo(WeatherHours);
