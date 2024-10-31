import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: number; // The target date as a string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): Record<string, number> => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className=" aspect-[1/1] flex items-center justify-center w-[70px] ">
      {Object.keys(timeLeft).length ? (
        <div className=" flex text-sm font-bold text-white">
          <p className="">{timeLeft.hours.toString().padStart(2, '0')}:&nbsp;</p>
          <p className="">{timeLeft.minutes.toString().padStart(2, '0')}:&nbsp;</p>
          <p className="">{timeLeft.seconds.toString().padStart(2, '0')}</p>
        </div>
      ) : (
        <div className="w-[34px] animate-bounce">
          <img src="./image/gift.png" />
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
