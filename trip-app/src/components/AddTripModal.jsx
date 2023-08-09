import { useState } from "react";
import PropTypes from "prop-types";
import css from "./css/AddTripModal.module.css";
import options from "../cities.json";

const AddTripModal = ({ addTrip }) => {
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    const selectedCity = options.filter((option) => option.city === city);
    const image = selectedCity[0].image;

    const newTrip = {
      id: Date.now(),
      city,
      image,
      startDate,
      endDate,
    };

    addTrip(newTrip);

    setCity("");
    setStartDate("");
    setEndDate("");
    closeModal();
  };

  const handleCancel = () => {
    setCity("");
    setStartDate("");
    setEndDate("");
    closeModal();
  };

  const minStartDate = new Date().toISOString().split("T")[0];
  const maxStartDate = new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const minEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : "";
  const maxEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : "";

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
                  src="/close.svg"
                  alt="close-button"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <form className={css.form}>
              <div>
                <label htmlFor="city"> <span className={css.required} >*</span> City</label>
              </div>
              <select
                id="city"
                value={city}
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
                <label htmlFor="startDate"> <span className={css.required} >*</span> Start Date</label>
              </div>
              <input
                type="date"
                id="startDate"
                value={startDate}
                min={minStartDate}
                max={maxStartDate}
                onChange={handleStartDateChange}
                className={css.input}
                placeholder="Select date"
              />
              <div>
                <label htmlFor="endDate"> <span className={css.required} >*</span> End Date</label>
              </div>
              <input
                type="date"
                id="endDate"
                value={endDate}
                min={minEndDate}
                max={maxEndDate}
                onChange={handleEndDateChange}
                className={css.input}
                placeholder="Select date"
              />
            </form>
            <div className={css.footer}>
              <button
                type="button"
                onClick={handleCancel}
                className={css.cancel_btn}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
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
            src="/plus.svg"
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
