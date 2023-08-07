import { useState } from "react";
import TripList from "./components/TripList";
import WeatherForWeek from "./components/WeatherForWeek";
import AddTripModal from "./components/AddTripModal";
import TodaysWeather from "./components/TodaysWeather";
import css from "./App.module.css";

const App = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      city: "London",
      image: "src/assets/cities-images/london.jpeg",
      startDate: "2023-08-14",
      endDate: "2023-08-21",
    },
    {
      id: 2,
      city: "Barcelona",
      image: "src/assets/cities-images/Barcelona.jpg",
      startDate: "2023-09-26",
      endDate: "2023-09-30",
    },
  ]);
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
            <img src="src/assets/search.svg" alt="" width={25} height={25} className={css.search_icon} />
          </div>
        </div>
        <div className={css.trip_list}>
          <TripList trips={filteredTrips} selectTrip={selectTrip} selectedTrip={selectedTrip} />
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
