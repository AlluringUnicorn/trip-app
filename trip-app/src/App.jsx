import { useState } from "react";
import TripList from "./components/TripList";
import TripDetails from "./components/TripDetails";
import TripModal from "./components/TripModal";
import TodayWeather from "./components/TodayWeather";
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
        <h1>Weather Forecast</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search your trip"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className={css.trip_list}>
          <TripList trips={filteredTrips} selectTrip={selectTrip} />
          <TripModal addTrip={addTrip} />
        </div>
        <h2>Week</h2>

        {selectedTrip ? (
          <TripDetails trip={selectedTrip} />
        ) : (
          <p>Select a trip from the list to view weather details.</p>
        )}
      </div>

      <div className={css.todays_weather}>
        <TodayWeather trip={selectedTrip} />
      </div>
    </div>
  );
};

export default App;
