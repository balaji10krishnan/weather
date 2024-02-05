import axios from "axios";

export const getWeatherApi = async (city, units) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=895284fb2d2c50a520ea537456963d9c&units=${units}`;
    const responce = await axios.get(url);
    return responce.data;
  } catch (err) {
    console.log("Error", err);
  }
};
