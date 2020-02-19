import moment from 'moment';
import clearSky from "../assets/images/icon_clear_sky.png";
import cloudsSky from "../assets/images/icon_clouds_sky.png";
import rain from "../assets/images/icon_rain_sky.png";

export function toLowerCaseAndRemoveSpaces(string) {
    return String(string)
      .toLowerCase()
      .replace(/ /g, "-");
}


export function groupBy(xs, key,processValue=(key)=>key) {
    return xs.reduce(function(rv, x) {
      (rv[processValue(x[key])] = rv[processValue(x[key])] || []).push(x);
      return rv;
    }, {});
};  

export function processTemp(temp){
  console.log('temp',temp);
  const gradosKelvin = 273.15
  return ( parseInt(temp) - gradosKelvin ).toFixed(0) 
}

export function getTime(value){
  return  moment(value).format("HH:MM")
}

export function getIconWeather(value){
  let image = clearSky
  switch (value) {
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
return image
}
