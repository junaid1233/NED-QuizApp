import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import { timeConverter } from '../../utils';

const Countdown = ({ countdownTime, timeOver, setTimeTaken }) => {
  const totalTime = countdownTime * 1000;
  const [remaining, setRemaining] = useState(totalTime);
  const endTimeRef = useRef(Date.now() + totalTime);
  const firedRef = useRef(false);
  const timeOverRef = useRef(timeOver);
  const setTimeTakenRef = useRef(setTimeTaken);

  timeOverRef.current = timeOver;
  setTimeTakenRef.current = setTimeTaken;

  const { hours, minutes, seconds } = timeConverter(remaining);

  useEffect(() => {
    endTimeRef.current = Date.now() + totalTime;
    setRemaining(totalTime);
    firedRef.current = false;

    let timer;

    const tick = () => {
      const left = Math.max(0, endTimeRef.current - Date.now());
      setRemaining(left);
      setTimeTakenRef.current(totalTime - left);

      if (left <= 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(timer);
        Swal.fire({
          icon: 'info',
          title: "Time's up!",
          text: 'Your test has been submitted automatically.',
          confirmButtonText: 'View Results',
          timer: 5000,
        }).then(() => timeOverRef.current(totalTime));
      }
    };

    tick();
    timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [countdownTime, totalTime]);

  return (
    <Button.Group size="massive" basic floated="right">
      <Popup content="Hours" trigger={<Button active>{hours}</Button>} position="bottom left" />
      <Popup content="Minutes" trigger={<Button active>{minutes}</Button>} position="bottom left" />
      <Popup content="Seconds" trigger={<Button active>{seconds}</Button>} position="bottom left" />
    </Button.Group>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
