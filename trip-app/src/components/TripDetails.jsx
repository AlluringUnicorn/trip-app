import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import css from "./TripDetails.module.css";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
  return dayOfWeek;
};

const TripDetails = ({ trip }) => {
  const [weatherForWeek, setweatherForWeek] = useState(null);

  useEffect(() => {
    const fetchWeatherForWeek = async () => {
      try {
        const API_KEY = "63Z62BVGS2K2LTELAMQ7JWYWU";
        const city = trip.city;
        const startDate = trip.startDate;
        const endDate = trip.endDate;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

        const response = await axios.get(apiUrl);

        setweatherForWeek(response.data.days);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (trip) {
      fetchWeatherForWeek();
    }
  }, [trip]);

  return (
    <ul className={css.weather_list}>
      {weatherForWeek &&
        weatherForWeek.map((day) => (
          <li key={day.datetimeEpoch} className={css.item}>
            <p>{formatDate(day.datetimeEpoch)}</p>
            <img
              src={`src/assets/weather-icons/${day.icon}.svg`}
              alt="weather-icon"
              width="50"
              height="50"
            />
            <p>
              {parseInt(day.tempmax)}&deg;/{parseInt(day.tempmin)}&deg;
            </p>
          </li>
        ))}
    </ul>
  );
};

export default TripDetails;

TripDetails.propTypes = {
  trip: PropTypes.object,
};
