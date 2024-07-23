import React from "react";
import { useTV } from "./provider/TVProvider";
import { formatStatus } from "@/utils/helper";
import { channels } from "@/db/data.json";

const Table: React.FC = () => {
  const { channelStatus, watchingChannel, watchingProgram, selectedTV } =
    useTV();

  return (
    <div className="max-h-[300px] overflow-y-auto w-fit mx-auto">
      <table className="rounded-md shadow-sm text-gray-900 table-fixed border-collapse mt-5">
        <thead className="sticky -top-1 bg-gray-200">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Channel Name</th>
            <th className="px-4 py-2 border border-gray-300">Program Name</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) =>
            channel.programs.map((program) => {
              const status =
                channelStatus.find(
                  (status) =>
                    status.channelId === channel.id &&
                    status.programId === program.id &&
                    status.tvId === selectedTV
                )?.status || "NEW";
              return (
                <tr
                  key={`${channel.id}-${program.id}`}
                  className={`even:bg-gray-100 hover:bg-gray-50 ${
                    status === "WATCHING" ? "bg-green-100" : ""
                  }`}
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {channel.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {program.name}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-300 ${
                      status === "WATCHING"
                        ? "text-green-500"
                        : status === "PAUSED"
                        ? "text-yellow-500"
                        : status === "STOPPED"
                        ? "text-red-500"
                        : status === "FINISHED"
                        ? "text-gray-900-500"
                        : "text-sky-500"
                    }`}
                  >
                    {formatStatus(status)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
