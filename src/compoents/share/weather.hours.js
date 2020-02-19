import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { processTemp, getTime, getIconWeather } from "../utils";

function WeatherHours(props) {
  const { label, temp_min = 0, temp_max = 10, hours } = props;

  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.day}>
      <Grid item xs={12}>
        <div className={classes.item}>{label}</div>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <List className={classes.list}>
            {(hours || []).map(
              ({ dt_txt, main: { temp }, weather: [{ main: _main }] }, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={getIconWeather(
                          _main,
                          getTime(dt_txt).split(":")[0]
                        )}
                        alt="clear"
                        className={classes.image}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${processTemp(temp)}°`}
                    secondary={getTime(dt_txt)}
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>
        <Grid item xs={12} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.item}>
          {processTemp(temp_min)}° {processTemp(temp_max)}°
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  day: {
    height: "auto",
    padding: 10,
    color: "black"
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
  }
}));
export default memo(WeatherHours);
