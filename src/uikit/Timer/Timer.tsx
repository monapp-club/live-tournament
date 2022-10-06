import { useEffect, useState } from "react";

interface TimerProps {
  dateTime: string;
}

const Timer = ({ dateTime }: TimerProps) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(dateTime) + Date.now();

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  });

  if (minutes === 0 && seconds === 0) {
    return null;
  }

  return (
    <div className="px-2">
      {minutes} : {seconds}
    </div>
  );
};

export default Timer;
