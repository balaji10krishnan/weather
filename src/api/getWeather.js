import axios from "axios";

export const getWeatherApi = async (city, units) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fcc9ff05d11bd5908ffe19933508b1df&units=${units}`;
    const responce = await axios.get(url);
    return responce.data;
  } catch (err) {
    console.log("Error", err);
  }
};
