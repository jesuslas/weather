import { apiBaseUrl, apiAppKey, cityId } from "../config";

export async function getWeather5Days(city) {
  return await fetch(
    `${apiBaseUrl}?id=${city || cityId}&appid=${apiAppKey}&lang=sp,es`
  );
}
