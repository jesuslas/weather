import { apiBaseUrl, apiAppKey, cityId } from "../config";

export async function getWeather5Days() {
  return await fetch(
    `${apiBaseUrl}?id=${cityId}&appid=${apiAppKey}&lang=sp,es`
  );
}
