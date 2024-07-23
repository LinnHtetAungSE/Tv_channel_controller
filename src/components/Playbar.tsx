import React, { useEffect, useState } from "react";
import { useTV } from "./provider/TVProvider";
import { Status } from "@/types.global";

const Playbar = () => {
  const {
    selectedTV,
    watchingChannel,
    watchingProgram,
    setStatus,
    setChannelStatus,
    status,
    channelStatus,
  } = useTV();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (status === "WATCHING") {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          const programDuration = Number(watchingProgram?.duration || 0);

          if (newTime >= programDuration) {
            setStatus("FINISHED");
            clearInterval(intervalId);

            const updatedChannelStatus = channelStatus.map((status: Status) => {
              if (
                status.tvId === selectedTV &&
                status.channelId === watchingChannel?.id &&
                status.programId === watchingProgram?.id
              ) {
                return {
                  ...status,
                  status: "FINISHED",
                };
              }
              return status;
            });

            setChannelStatus(updatedChannelStatus);
            setCurrentTime(0);
            setProgress(0);
            return programDuration;
          }

          setProgress((newTime / programDuration) * 100);
          return newTime;
        });
      }, 1000);
    } else if (status === "PAUSED") {
      clearInterval(intervalId!);
    } else if (status === "STOPPED") {
      clearInterval(intervalId!);
      setCurrentTime(0);
      setProgress(0);
    }

    return () => clearInterval(intervalId);
  }, [status, watchingProgram?.id, selectedTV, setChannelStatus]);

  useEffect(() => {
    if (status === "WATCHING") {
      setStatus("STOPPED");
    }
  }, [selectedTV, watchingProgram?.id]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="playbar-container w-full text-gray-900 my-5">
      <div className="playbar gap-5">
        <div>{formatTime(currentTime)}</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div>{formatTime(Number(watchingProgram?.duration || 0))}</div>
      </div>
    </div>
  );
};

export default Playbar;
