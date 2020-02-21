import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { getIconWeather, traslateDay } from "../utils";
import Avatar from "@material-ui/core/Avatar";

function WeatherDay(props) {
  const { label, temp_min = 0, temp_max = 10, main } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.day}>
      <Grid item xs={12}>
        <div className={classes.label}>{traslateDay(label)}</div>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <div className={classes.imageItem}>
            <Avatar src={getIconWeather(main)} />
          </div>
        </Grid>
        <Grid item xs={12} lg={12}>
          <div className={classes.temp}>
            {((parseInt(temp_min) + parseInt(temp_max)) / 2).toFixed(0)}°
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12}>
        <div className={classes.label}>
          {temp_max}° / {temp_min}°
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  day: {
    height: 170
  },
  imageItem: {
    textAlign: "right",
    marginTop: 25
  },
  label: {
    color: "#fff",
    fontFamily: "Calibri",
    fontSize: 22,
    textAlign: "center"
  },
  temp: {
    color: "#fff",
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Calibri",
    fontWeight: "bold"
  },
  image: {
    width: 40
  }
}));
export default memo(WeatherDay);
