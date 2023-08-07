import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import css from "./TodayWeather.module.css";
import Countdown from "./Countdown";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
  return dayOfWeek;
};

const TodayWeather = ({ trip }) => {
  const [weatherForToday, setweatherForToday] = useState(null);

  useEffect(() => {
    const fetchWeatherForToday = async () => {
      try {
        const API_KEY = "G4HL346QTXKW88DQ3H8ZSL2ZY";
        const city = trip.city;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

        const response = await axios.get(apiUrl);

        setweatherForToday(response.data.days[0]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (trip) {
      fetchWeatherForToday();
    }
  }, [trip]);

  return (
    weatherForToday && (
      <>
        <div className={css.weather_container}>
          <p className={css.weekday}>
            {formatDate(weatherForToday.datetimeEpoch)}
          </p>
          <div className={css.degree_wrapper}>
            <img
              src={`src/assets/weather-icons/${weatherForToday.icon}.svg`}
              alt="weather-icon"
              width="80"
              height="80"
            />
            <p className={css.temp}>
              {parseInt(weatherForToday.temp)}{" "}
              <span className={css.degrees}>&#8451;</span>{" "}
            </p>
          </div>
          <p className={css.city}>{trip.city}</p>
        </div>
        <Countdown trip={trip} />
      </>
    )
  );
};

export default TodayWeather;

TodayWeather.propTypes = {
  trip: PropTypes.object,
};
