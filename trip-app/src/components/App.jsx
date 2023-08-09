import { useState, useEffect } from "react";
import TripList from "./TripList";
import WeatherForWeek from "./WeatherForWeek";
import AddTripModal from "./AddTripModal";
import TodaysWeather from "./TodaysWeather";
import initialState from "../initialState";
import css from "./css/App.module.css";

const App = () => {
  const initialTrips =
    JSON.parse(localStorage.getItem("trips")) || initialState;
  
  const [trips, setTrips] = useState(initialTrips);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const addTrip = (trip) => {
    setTrips([...trips, trip]);
  };

  const selectTrip = (trip) => {
    setSelectedTrip(trip);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTrips = trips.filter((trip) =>
    trip.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={css.container}>
      <div className={css.main}>
        <h1>
          <span className={css.h_span}> Weather</span> Forecast
        </h1>
        <div className={css.input_wrapper}>
          <input
            className={css.input}
            type="text"
            placeholder="Search your trip"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div>
            <img
              src="/search.svg"
              alt=""
              width={25}
              height={25}
              className={css.search_icon}
            />
          </div>
        </div>
        <div className={css.trip_list}>
          <TripList
            trips={filteredTrips}
            selectTrip={selectTrip}
            selectedTrip={selectedTrip}
          />
          <AddTripModal addTrip={addTrip} />
        </div>
        <h2>Week</h2>

        {selectedTrip ? (
          <WeatherForWeek trip={selectedTrip} />
        ) : (
          <p>Select a trip from the list to view weather details.</p>
        )}
      </div>

      <div className={css.todays_weather}>
        <TodaysWeather trip={selectedTrip} />
      </div>
    </div>
  );
};

export default App;
