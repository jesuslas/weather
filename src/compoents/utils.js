import moment from "moment";
import clearSky from "../assets/images/icon_clear_sky.png";
import cloudsSky from "../assets/images/icon_clouds_sky.png";
import rain from "../assets/images/icon_rain_sky.png";
import snow from "../assets/images/icon_clouds_snow.png";
import clearSkyDay from "../assets/images/icon_clear_sky_day.png";
import clearSkyNight from "../assets/images/icon_clear_sky_night.png";

export function toLowerCaseAndRemoveSpaces(string) {
  return String(string)
    .toLowerCase()
    .replace(/ /g, "-");
}

export function groupBy(xs, key, processValue = key => key) {
  return xs.reduce(function(rv, x) {
    (rv[processValue(x[key])] = rv[processValue(x[key])] || []).push(x);
    return rv;
  }, {});
}

export function processTemp(temp) {
  const gradosKelvin = 273.15;
  return (parseInt(temp) - gradosKelvin).toFixed(0);
}

export function getTime(value) {
  return moment(value).format("H:00");
}

export function getIconWeather(value, time) {
  let image = clearSky;
  switch (value) {
    case "Clear":
      if (time) {
        time = parseInt(time);
        if (time < 5 || time >= 21) {
          image = clearSkyNight;
        } else {
          image = clearSkyDay;
        }
      } else {
        image = clearSky;
      }
      break;
    case "Clouds":
      image = cloudsSky;
      break;
    case "Rain":
      image = rain;
      break;
    case "Snow":
      image = snow;
      break;

    default:
      break;
  }
  return image;
}

export function traslateDay(value) {
  let day = toLowerCaseAndRemoveSpaces(value);
  const days = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo"
  };
  return days[day] || "invalid day";
}
