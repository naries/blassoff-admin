import React from "react";
import { DonutChart } from "bizcharts";

const data = [
  {
    type: "Subscribed",
    value: 27,
  },
  {
    type: "Unsubscribed",
    value: 25,
  },
];

export function TotalListenMinutes() {
  return (
    <DonutChart
      data={data || []}
      title={{
        visible: true,
        text: "Total Time Listened",
      }}
      height={250}
      radius={0.5}
      angleField="value"
      colorField="type"
      label={false}
      pieStyle={{ stroke: "white", lineWidth: 0 }}
      statistic={{
        title: false,
      }}
    />
  );
}
