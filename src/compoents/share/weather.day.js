import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,  } from "@material-ui/core";
import clearSky from "../../assets/images/icon_clear_sky.png";
import cloudsSky from "../../assets/images/icon_clouds_sky.png";
import rain from "../../assets/images/icon_rain_sky.png";
let image = clearSky



function WeatherDay(props) {
    const {label,temp_min=0,temp_max=10, main} = props;
    switch (main) {
        case "Clear":
            image = clearSky
            break;
        case "Clouds":
            image = cloudsSky
            break;    
        case "Rain":
            image = rain
            break;    
    
        default:
            break;
    }
    console.log('main',main);
    const classes = useStyles();
    return (
            <Grid container spacing={1} className={classes.day}>
                <Grid  item xs={12}>
                    <div className={classes.item}>
                        {label}
                    </div>
                </Grid>
                <Grid  item xs={12} >
                    <div className={classes.item}>
                        <img src={image}  alt="clear" className={classes.image} />
                    </div>
                </Grid>
                <Grid  item xs={12} >
                    <div className={classes.item}>
                        {temp_min}° {temp_max}°
                    </div>
                </Grid>
            </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    day: {
        height:120,
        padding:10
    },
    item: {
        textAlign: "center"
    },
    image:{
        width:30,
    }
   
  }));
export default memo(WeatherDay);