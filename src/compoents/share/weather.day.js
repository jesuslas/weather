import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { getIconWeather } from "../utils";

function WeatherDay(props) {
  const { label, temp_min = 0, temp_max = 10, main } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.day}>
      <Grid item xs={12}>
        <div className={classes.item}>{label}</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.item}>
          <img
            src={getIconWeather(main)}
            alt="clear"
            className={classes.image}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.temp}>
          {((parseInt(temp_min) + parseInt(temp_max)) / 2).toFixed(0)}°
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.item}>
          {temp_min}° / {temp_max}°
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  day: {
    height: 200,
    padding: 10
  },
  item: {
    textAlign: "center"
  },
  temp: {
    textAlign: "center",
    fontSize: 40
  },
  image: {
    width: 20
  }
}));
export default memo(WeatherDay);
