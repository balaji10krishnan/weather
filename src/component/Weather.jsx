import React, { useEffect, useState } from "react";
import classes from "./weather.module.css";
import { getWeatherApi } from "../api/getWeather";
import O1d from "../assets/icons/01d@2x.png";
import O1n from "../assets/icons/01n@2x.png";
import O2d from "../assets/icons/02d@2x.png";
import O2n from "../assets/icons/02n@2x.png";
import O3d from "../assets/icons/03d@2x.png";
import O10d from "../assets/icons/10d@2x.png";
import O10n from "../assets/icons/10n@2x.png";
import O4d from "../assets/icons/04d@2x.png";
import O9d from "../assets/icons/09d@2x.png";
import O11d from "../assets/icons/11d@2x.png";
import O13d from "../assets/icons/13d@2x.png";
import O50d from "../assets/icons/50d@2x.png";
import sunny from "../assets/background/clear_sky.jpg";
import cloud from "../assets/background/cloud.jpg";
import mist from "../assets/background/mist.jpg";
import rain from "../assets/background/rain.jpg";
import snow from "../assets/background/snow.jpg";
import strom from "../assets/background/strom.jpg";
function Weather() {
  const [city, setCity] = useState("Chennai");
  const [inputValue, setinputValue] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [units, setUnits] = useState("imperial");
  const [image, setImage] = useState();
  const [backgroungImage, setBackgroungImage] = useState("");
  const getWeather = async (e) => {
    if (e.key === "Enter") {
      const responce = await getWeatherApi(city, units);
      if (responce) {
        setWeatherData(responce);
        iconSet(responce?.weather[0]?.icon);
      }
      setinputValue("");
    }
  };
  const getInitialWeather = async () => {
    const responce = await getWeatherApi(city, units);
    if (responce) {
      setWeatherData(responce);
      iconSet(responce?.weather[0]?.icon);
    }
  };
  const iconSet = (value) => {
    if (value === "01d") {
      setImage(O1d);
      setBackgroungImage(sunny);
    } else if (value === "01n") {
      setImage(O1n);
      setBackgroungImage(sunny);
    } else if (value === "02d") {
      setImage(O2d);
      setBackgroungImage(cloud);
    } else if (value === "02n") {
      setImage(O2n);
      setBackgroungImage(cloud);
    } else if (value === "03d") {
      setImage(O3d);
      setBackgroungImage(cloud);
    } else if (value === "10d") {
      setImage(O10d);
      setBackgroungImage(rain);
    } else if (value === "10n") {
      setImage(O10n);
      setBackgroungImage(rain);
    } else if (value === "04d" || value === "04n") {
      setBackgroungImage(cloud);

      setImage(O4d);
    } else if (value === "09d" || value === "09n") {
      setBackgroungImage(rain);

      setImage(O9d);
    } else if (value === "11d" || value === "11n") {
      setBackgroungImage(strom);

      setImage(O11d);
    } else if (value === "13d" || value === "13n") {
      setBackgroungImage(snow);
      setImage(O13d);
    } else if (value === "50d" || value === "50n") {
      setBackgroungImage(mist);
      setImage(O50d);
    } else {
      setBackgroungImage(sunny);
      setImage(O1n);
    }
  };
  useEffect(() => {
    getInitialWeather();
  }, [units]);
  return (
    <>
      <div
        className={classes.main}
        style={{
          backgroundImage: `url(${backgroungImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={classes.search}>
          <input
            className={classes.input}
            placeholder="Search The City"
            onChange={(e) => {
              setinputValue(e.target.value);
              setCity(e.target.value);
            }}
            value={inputValue}
            onKeyPress={(e) => {
              getWeather(e);
            }}
          />
        </div>
        <div className={classes.continer}>
          <div className={classes.weatherDel}>
            <div className={classes.header}>
              <img src={image} /> <p>SkyScanner</p>
            </div>
            <p className={classes.city}>{weatherData?.name}</p>
            <h2 className={classes.temp}>
              {weatherData?.main?.temp}
              <span className={classes.tempType}>
                <span
                  className={units === "imperial" ? classes.unitActive : ""}
                  onClick={() => setUnits("imperial")}
                >
                  °F
                </span>{" "}
                |{" "}
                <span
                  className={units === "metric" ? classes.unitActive : ""}
                  onClick={() => setUnits("metric")}
                >
                  °C
                </span>
              </span>
            </h2>
          </div>
          <div className={classes.footer}>
            <div>
              <p className={classes.title}>Humidity</p>
              <p className={classes.value}>{weatherData?.main?.humidity}%</p>
            </div>
            <div>
              <p className={classes.title}>Feels Like</p>
              <p className={classes.value}>
                {weatherData?.main?.feels_like}°
                {units === "imperial" ? "F" : "C"}
              </p>
            </div>
            <div>
              <p className={classes.title}>Wind Speed</p>
              <p className={classes.value}>{weatherData?.wind?.speed}MPH</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
