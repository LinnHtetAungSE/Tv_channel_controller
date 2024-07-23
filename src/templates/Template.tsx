"use client";

import Controller from "@/components/Controller";
import Playbar from "@/components/Playbar";
import Screen from "@/components/Screen";
import Table from "@/components/Table";
import React from "react";
import { channels } from "@/db/data.json";
import { TVProvider } from "@/components/provider/TVProvider";

export default function Template() {
  return (
    <TVProvider>
      <div className="overflow-x-hidden">
        <Screen />
        {/* <Playbar /> */}
        <div className="flex bg-white rounded-md p-5">
          <Table />
          <Controller />
        </div>
      </div>
    </TVProvider>
  );
}
