import React, { useEffect, useState } from "react";
import classes from "./Weather.module.css";
import clearSky from "../assets/icons/01d@2x.png";
import { getWeatherApi } from "../api/getWeatherApi";
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
import sunny from "../assets/bg/clear_sky.jpg";
import cloud from "../assets/bg/cloud.jpg";
import mist from "../assets/bg/mist.jpg";
import rain from "../assets/bg/rain.jpg";
import snow from "../assets/bg/snow.jpg";
import strom from "../assets/bg/strom.jpg";
function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [city, setCityValue] = useState("Chennai");
  const [unit, setUnitValue] = useState("imperial");
  const [image, setImage] = useState("");
  const [backgroungImage, setBackgroungImage] = useState("");
  const [loader, setLoader] = useState(true);
  const getWeather = async (city, unit) => {
    try {
      setLoader(true);
      const responce = await getWeatherApi(city, unit);
      if (responce) {
        setWeatherData(responce);
        iconSet(responce?.weather[0]?.icon);
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoader(false);
    }
  };
  const handleInput = (e) => {
    if (e.keyCode === 13) {
      getWeather(city, "metric");
      setInputValue("");
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
    getWeather(city, unit);
  }, [unit]);
  return (
    <>
      {loader ? (
        <div className={classes.loaderAlign}>
          <div className={classes.loader}></div>
        </div>
      ) : (
        <div
          className={classes.main}
          style={{
            backgroundImage: `url(${backgroungImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={classes.container}>
            <div className={classes.search}>
              <input
                placeholder="Search The City"
                value={inputValue}
                onKeyDown={(e) => {
                  handleInput(e);
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setCityValue(e.target.value);
                }}
              />
            </div>
            <div className={classes.weatherInfo}>
              <div className={classes.cityDel}>
                <div className={classes.logo}>
                  <img src={image} />
                  <h1>SkyScanner</h1>
                </div>
                <div className={classes.cityName}>
                  <span>{weatherData?.name}, </span>
                  <span>{weatherData?.sys?.country}</span>
                  <p className={classes.climate}>
                    {weatherData?.weather?.[0]?.main}
                  </p>
                </div>
              </div>
              <div className={classes.temp}>
                <p>
                  {Math.round(weatherData?.main?.temp)}
                  <span className={classes.unit}>
                    <span
                      onClick={() => {
                        setUnitValue("imperial");
                      }}
                      style={{ cursor: "pointer" }}
                      className={unit === "imperial" ? classes.opacity : ""}
                    >
                      {" "}
                      °F{" "}
                    </span>{" "}
                    |{" "}
                    <span
                      onClick={() => {
                        setUnitValue("metric");
                      }}
                      style={{ cursor: "pointer" }}
                      className={unit === "metric" ? classes.opacity : ""}
                    >
                      {" "}
                      °C
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div className={classes.weatherDel}>
              <div className={classes.weatherDiv}>
                <p className={classes.head}>Tem_max</p>
                <p className={classes.value}>
                  {Math.round(weatherData?.main?.temp_max)}
                  {unit === "imperial" ? "°F" : "°C"}
                </p>
              </div>
              <div className={classes.weatherDiv}>
                <p className={classes.head}>Tem_min</p>
                <p className={classes.value}>
                  {Math.round(weatherData?.main?.temp_min)}
                  {unit === "imperial" ? "°F" : "°C"}
                </p>
              </div>
              <div className={classes.weatherDiv}>
                <p className={classes.head}>Humidity</p>
                <p className={classes.value}>{weatherData?.main?.humidity}</p>
              </div>
              <div className={classes.weatherDiv}>
                <p className={classes.head}>Pressure</p>
                <p className={classes.value}>{weatherData?.main?.pressure}</p>
              </div>
              <div className={classes.weatherDiv}>
                <p className={classes.head}>Wind</p>
                <p className={classes.value}>{weatherData?.wind?.speed}</p>
              </div>
              <div className={classes.weatherDiv}>
                <p className={classes.head}>Feels Like</p>
                <p className={classes.value}>
                  {Math.round(weatherData?.main?.feels_like)}
                  {unit === "imperial" ? "°F" : "°C"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
