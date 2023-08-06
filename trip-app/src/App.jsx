import { useState } from "react";
import TripList from "./components/TripList";
import TripDetails from "./components/TripDetails";
import TripModal from "./components/TripModal";
import css from './App.module.css';

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
      startDate: "2023-09-25",
      endDate: "2023-09-30",
    },
  ]); // State to hold the list of trips
  const [selectedTrip, setSelectedTrip] = useState(null); // State to hold the selected trip
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Function to add a new trip to the list
  const addTrip = (trip) => {
    setTrips([...trips, trip]);
  };

  // Function to select a trip from the list
  const selectTrip = (trip) => {
    setSelectedTrip(trip);
  };

  // Function to handle the search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter trips based on the search query
  const filteredTrips = trips.filter((trip) =>
    trip.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
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
  );
};

export default App;
