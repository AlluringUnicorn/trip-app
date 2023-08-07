import { useState } from "react";
import PropTypes from "prop-types";
import css from "./TripModal.module.css";

const TripModal = ({ addTrip }) => {
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDone = () => {
    // Validate inputs and create a new trip object
    const newTrip = {
      id: Date.now(), // You can use a proper ID generator here
      city,
      startDate,
      endDate,
    };

    // Call the addTrip function passed from the App component to add the new trip
    addTrip(newTrip);

    // Reset the state and close the modal
    setCity("");
    setStartDate("");
    setEndDate("");
    setShowModal(false);
  };

  return (
    <div className={css.modal_wrapper}>
      {showModal && (
        <div className="modal">
          <h2>Add a New Trip</h2>
          <form>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              // max={/* Calculate the max date (today + 15 days) */}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              // min={/* startDate + 1 */}
              // max={/* Calculate the max date (startDate + 15 days) */}
              onChange={(e) => {
                setEndDate(e.target.value);
                console.log(endDate);
              }}
            />
            <button type="button" onClick={handleDone}>
              Done
            </button>
          </form>
        </div>
      )}
      <button className={css.add_btn} onClick={() => setShowModal(true)}>
        <div>
          <img
            src="src/assets/plus.svg"
            alt="weather-icon"
            width="25"
            height="25"
          />
        </div>
        Add Trip
      </button>
    </div>
  );
};

export default TripModal;

TripModal.propTypes = {
  addTrip: PropTypes.func.isRequired,
};
