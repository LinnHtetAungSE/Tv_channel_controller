import React, { createContext, useContext, useState, ReactNode } from "react";
import { channelsStatus } from "@/db/data.json";
import { Channel, Program, Status } from "@/types.global";

interface TVContextProps {
  channelStatus: Status[];
  setChannelStatus: (status: Status[]) => void;
  selectedTV: string;
  setSelectedTV: (tvId: string) => void;
  watchingChannel: Channel | null;
  setWatchingChannel: (channel: Channel) => void;
  watchingProgram: Program | null;
  setWatchingProgram: (program: Program) => void;
  status: string;
  setStatus: (status: string) => void;
}

const TVContext = createContext<TVContextProps | undefined>(undefined);

export const useTV = () => {
  const context = useContext(TVContext);
  if (!context) {
    throw new Error("useTV must be used within a TVProvider");
  }
  return context;
};

export const TVProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTV, setSelectedTV] = useState<string>("");
  const [channelStatus, setChannelStatus] = useState<Status[]>(channelsStatus);
  const [watchingChannel, setWatchingChannel] = useState<Channel | null>(null);
  const [watchingProgram, setWatchingProgram] = useState<Program | null>(null);
  const [status, setStatus] = useState("stopped");

  return (
    <TVContext.Provider
      value={{
        channelStatus,
        setChannelStatus,
        selectedTV,
        setSelectedTV,
        watchingChannel,
        setWatchingChannel,
        watchingProgram,
        setWatchingProgram,
        status,
        setStatus,
      }}
    >
      {children}
    </TVContext.Provider>
  );
};
