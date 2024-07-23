import React, { useEffect } from "react";
import { useTV } from "./provider/TVProvider";
import { channels, tvList } from "@/db/data.json";
import Image from "next/image";
import { Program } from "@/types.global";
import Playbar from "./Playbar";

export default function Screen() {
  const {
    selectedTV,
    setSelectedTV,
    watchingChannel,
    setWatchingChannel,
    watchingProgram,
    setWatchingProgram,
    channelStatus,
    setChannelStatus,
    status,
    setStatus,
  } = useTV();

  useEffect(() => {
    if (tvList.length > 0) {
      setSelectedTV(tvList[0].id);
    }
  }, [setSelectedTV]);

  useEffect(() => {
    if (selectedTV) {
      const tv = tvList.find((tv) => tv.id === selectedTV);
      if (tv && channels.length > 0) {
        setWatchingChannel(channels[0]);
        setWatchingProgram(channels[0].programs[0]);
      }
    }
  }, [selectedTV, setWatchingChannel, setWatchingProgram]);

  const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChannelId = e.target.value;
    const selectedChannel = channels.find(
      (channel) => channel.id === selectedChannelId
    );
    handleStopProgrom();
    if (selectedChannel) {
      setWatchingChannel(selectedChannel);
      setWatchingProgram(selectedChannel.programs[0]);
    }
  };

  const handleStopProgrom = () => {
    if ((watchingProgram && status === "WATCHING") || status === "PAUSED") {
      const updatedChannelStatus = channelStatus.map((status) => {
        if (
          status.tvId === selectedTV &&
          status.channelId === watchingChannel?.id &&
          status.programId === watchingProgram?.id
        ) {
          return {
            ...status,
            status: "STOPPED",
          };
        }
        return status;
      });
      setChannelStatus(updatedChannelStatus);
      setStatus("STOPPED");
    }
  };

  const handleProgramChange = (program: Program) => {
    handleStopProgrom();
    setWatchingProgram(program);
  };

  const handleChangeTV = (e: any) => {
    handleStopProgrom();
    setSelectedTV(e.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full bg-white text-black p-5 mx-auto rounded-md mb-5">
      <div className="relative h-fit">
        <Image
          className={`w-full h-[300px] rounded-md object-center object-scale-down`}
          src={`/image/${
            status === "WATCHING" ? watchingProgram?.img : watchingChannel?.img
          }`}
          alt="icon"
          width={1000}
          height={1000}
        />
        <div className="absolute w-full bg-gray-300/75 rounded-md bottom-0 left-0 px-2">
          <Playbar />
        </div>
      </div>
      <div className="h-fit p-5">
        <form className="flex justify-between">
          <select
            className="border rounded-sm"
            value={selectedTV}
            onChange={handleChangeTV}
          >
            {tvList.map((tv) => (
              <option key={tv.id} value={tv.id}>
                {tv.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-sm"
            value={watchingChannel?.id}
            onChange={handleChannelChange}
          >
            {channels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </form>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {watchingChannel?.programs.map((program) => (
            <div
              key={program.id}
              className={`mb-2 cursor-pointer ${
                watchingProgram?.id === program.id ? "grayscale-0" : "grayscale"
              }`}
              onClick={() => handleProgramChange(program)}
            >
              <Image
                className="w-full h-[160px]"
                src={`/image/${program.img || "default_program.jpg"}`}
                alt="program"
                width={1000}
                height={1000}
              />
              <p className="text-center">{program.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
