import { useEffect, useState } from "react";

export const useTimeSpent = (onStop: (timeElapsed: number) => void) => {
  const [timeSpent, setTimeSpent] = useState<number>(0);

  useEffect(() => {
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      setTimeSpent(elapsedSeconds);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      const totalTimeElapsed = Math.floor((Date.now() - startTime) / 1000);
      onStop(totalTimeElapsed);
    };
  }, [onStop]);

  return timeSpent;
};
