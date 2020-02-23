import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { processTemp, getTime, getIconWeather, traslateDay } from "../utils";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import cities from "../../assets/data/cities.json";

function WeatherHours(props) {
  const {
    label,
    temp_min = 0,
    temp_max = 10,
    main,
    hours,
    cityId,
    setCity
  } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.day}>
      <Grid item xs={12}>
        <Select
          labelId="select-label"
          id="select"
          onChange={({ target: { value } }) => setCity(value)}
          style={{ colot: "#fff" }}
          autoWidth
          value={cityId}
          className={classes.select}
          inputProps={{
            classes: {
              icon: classes.icon
            }
          }}
        >
          {cities.map(({ name, id }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.labelDay}>{traslateDay(label, true)}</div>
      </Grid>
      <Grid container item>
        <Grid item lg={5} xl={5} md={5} xs={2} />
        <Grid item lg={1} xl={1} md={1} xs={3}>
          <Avatar
            classes={{ root: classes.avatarBig }}
            src={getIconWeather(main)}
          />
        </Grid>
        <Grid item lg={1} xl={1} md={1} xs={5}>
          <div className={classes.tempDay}>
            {(
              (parseInt(processTemp(temp_min)) +
                parseInt(processTemp(temp_max))) /
              2
            ).toFixed(0)}
            °
          </div>
        </Grid>
        <Grid item lg={5} xl={5} md={5} xs={2} />
      </Grid>
      <Grid container>
        <Grid item lg={2} xl={2} xs={1} />
        <Grid item lg={8} xl={8} xs={10}>
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
        <Grid item lg={2} xl={2} xs={1} />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  day: {
    height: "auto",
    color: "#fff",
    fontFamily: "Calibri",
    paddingTop: 20
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
  },
  select: {
    color: "#fff",
    "&:before": {
      borderColor: "#fff"
    },
    "&:after": {
      borderColor: "#fff"
    }
  },
  icon: {
    fill: "#fff"
  }
}));
export default memo(WeatherHours);
