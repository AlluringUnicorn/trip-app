import { useState } from "react";
import PropTypes from "prop-types";
import css from "./css/AddTripModal.module.css";
import options from "../cities.json";

const AddTripModal = ({ addTrip }) => {
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

const calculateMinEndDate = () => {
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate.toISOString().split("T")[0];
};

const calculateMaxEndDate = () => {
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 15);
  return currentDate.toISOString().split("T")[0];
};

  return (
    <div className={css.modal_wrapper}>
      {showModal && (
        <div className={css.backdrop}>
          <div className={css.modal}>
            <div className={css.heading}>
              <h2 className={css.h2}>Create Trip</h2>
              <button
                type="button"
                onClick={closeModal}
                className={css.close_btn}
              >
                <img
                  src="src/assets/close.svg"
                  alt="close-button"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <form className={css.form}>
              <div>
                <label htmlFor="city">City</label>
              </div>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                className={css.select}
              >
                <option value="">Please select a city</option>
                {options.map((option) => (
                  <option key={option.city} value={option.city}>
                    {option.city}
                  </option>
                ))}
              </select>
              <div>
                <label htmlFor="startDate">Start Date</label>
              </div>
              <input
                type="date"
                id="startDate"
                value={startDate}
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) => setStartDate(e.target.value)}
                className={css.input}
                placeholder="Select date"
              />
              <div>
                <label htmlFor="endDate">End Date</label>
              </div>
              <input
                type="date"
                id="endDate"
                value={endDate}
                min={calculateMinEndDate()}
                max={calculateMaxEndDate()}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  console.log(endDate);
                }}
                className={css.input}
                placeholder="Select date"
              />
            </form>
            <div className={css.footer}>
              <button
                type="button"
                onClick={closeModal}
                className={css.cancel_btn}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleDone}
                className={css.save_btn}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <button className={css.add_btn} onClick={openModal}>
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

export default AddTripModal;

AddTripModal.propTypes = {
  addTrip: PropTypes.func.isRequired,
};
