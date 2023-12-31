import PropTypes from "prop-types";
import css from "./css/TripList.module.css";

const TripList = ({ trips, selectTrip, selectedTrip }) => {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const compareByStartDate = (a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  };

  const sortedTrips = trips.slice().sort(compareByStartDate);

  return (
    <ul className={css.list}>
      {sortedTrips.map((trip) => (
        <li
          key={trip.id}
          onClick={() => selectTrip(trip)}
          className={
            selectedTrip && selectedTrip.id === trip.id
              ? css.selected
              : css.trip_item
          }
        >
          <img src={trip.image} alt="" width={270} height={250} />
          <div className={css.details}>
            <p>{trip.city}</p>
            <p className={css.date}>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TripList;

TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  selectTrip: PropTypes.func.isRequired,
  selectedTrip: PropTypes.object,
};
