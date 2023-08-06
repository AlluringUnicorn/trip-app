import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const TripDetails = ({ trip }) => {
  const [weatherForToday, setweatherForToday] = useState(null);
  const [weatherForWeek, setweatherForWeek] = useState(null);

  useEffect(() => {
    const fetchWeatherForToday = async () => {
      try {
        const API_KEY = "G4HL346QTXKW88DQ3H8ZSL2ZY";
        const city = trip.city;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

        const response = await axios.get(apiUrl);

        setweatherForToday(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchWeatherForWeek = async () => {
      try {
        const API_KEY = "63Z62BVGS2K2LTELAMQ7JWYWU";
        const city = trip.city;
        const startDate = trip.startDate;
        const endDate = trip.endDate;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

        const response = await axios.get(apiUrl);

        console.log(response);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (trip) {
      fetchWeatherForToday();
      fetchWeatherForWeek();
    }
  }, [trip, weatherForWeek]);

  return (
    <div className="trip-details">
      <h2>Weather Forecast for {trip.city}</h2>
      {weatherForToday ? (
        <div>
          <p>Date: {weatherForToday.days[0].datetimeStr}</p>
          <p>Temperature: {weatherForToday.days[0].temp}</p>
          <p>Weather: {weatherForToday.days[0].conditions}</p>
          {/* Add more weather details as needed */}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default TripDetails;

TripDetails.propTypes = {
  trip: PropTypes.object.isRequired,
};
