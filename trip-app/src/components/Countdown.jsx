import css from "./Countdown.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Countdown = ({ trip }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetDate = new Date(trip.startDate).getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className={css.countdown}>
      <span className={css.span}>
        <div className={css.numbers}>{timeLeft.days}</div>
        <div className={css.countdown_time}>days</div>
      </span>
      <span className={css.span}>
        <div className={css.numbers}>{timeLeft.hours}</div>
        <div className={css.countdown_time}>hours</div>
      </span>
      <span className={css.span}>
        <div className={css.numbers}>{timeLeft.minutes}</div>
        <div className={css.countdown_time}>minutes</div>
      </span>
      <span className={css.span}>
        <div className={css.numbers}>{timeLeft.seconds}</div>
        <div className={css.countdown_time}>seconds</div>
      </span>
    </div>
  );
};

export default Countdown;

Countdown.propTypes = {
  trip: PropTypes.object,
};
