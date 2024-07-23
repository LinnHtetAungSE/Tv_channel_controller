import PauseIcon from "@/common/svg/PauseIcon";
import PlayIcon from "@/common/svg/PlayIcon";
import StopIcon from "@/common/svg/StopIcon";
import React from "react";
import { useTV } from "./provider/TVProvider";

const Controller = () => {
  const {
    status,
    setStatus,
    selectedTV,
    watchingChannel,
    watchingProgram,
    channelStatus,
    setChannelStatus,
  } = useTV();

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);

    if (watchingChannel && watchingProgram) {
      const updatedChannelStatus = channelStatus.map((status) => {
        if (
          status.channelId === watchingChannel.id &&
          selectedTV === status.tvId &&
          status.programId === watchingProgram.id
        ) {
          return {
            ...status,
            status: newStatus,
          };
        }
        return status;
      });

      setChannelStatus(updatedChannelStatus);
    }
  };

  return (
    <div className="flex gap-3 w-[40%] h-full mt-7 ms-10">
      <button
        type="button"
        disabled={status === "WATCHING"}
        className={`rounded-[15px] p-2 ${
          status === "WATCHING" ? "bg-green-400" : "bg-gray-400"
        }`}
        onClick={() => handleStatusChange("WATCHING")}
      >
        <PlayIcon width={35} height={35} />
      </button>
      <button
        type="button"
        disabled={status === "PAUSED"}
        className={`rounded-[15px] p-2 ${
          status === "PAUSED" ? "bg-yellow-400" : "bg-gray-400"
        }`}
        onClick={() => handleStatusChange("PAUSED")}
      >
        <PauseIcon width={35} height={35} />
      </button>
      <button
        type="button"
        disabled={status === "STOPPED"}
        className={`rounded-[15px] p-2 ${
          status === "STOPPED" ? "bg-red-400" : "bg-gray-400"
        }`}
        onClick={() => handleStatusChange("STOPPED")}
      >
        <StopIcon width={35} height={35} />
      </button>
    </div>
  );
};

export default Controller;
