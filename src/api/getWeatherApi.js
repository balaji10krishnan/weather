import axios from "axios";
import React from "react";

export const getWeatherApi = async (city, unit) => {
  try {
    const API_key = "fcc9ff05d11bd5908ffe19933508b1df";
    const responce = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=${unit}`
    );
    console.log(responce.data);
    return responce.data;
  } catch (err) {
    console.log("Error", err);
  }
};
