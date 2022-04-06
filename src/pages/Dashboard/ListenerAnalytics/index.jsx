import React from "react";
import { Chart, Line, Point, Tooltip, Legend } from "bizcharts";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "./style.css";

const data = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 1,
  },
  {
    month: "Jan",
    city: "London",
    temperature: 1,
  },
  {
    month: "Jan",
    city: "Lagos",
    temperature: 1,
  },
  {
    month: "Jan",
    city: "Abuja",
    temperature: 1,
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 2,
  },
  {
    month: "Feb",
    city: "London",
    temperature: 2,
  },
  {
    month: "Feb",
    city: "Lagos",
    temperature: 2.5,
  },
  {
    month: "Feb",
    city: "Abuja",
    temperature: 3,
  },
  {
    month: "March",
    city: "Tokyo",
    temperature: 2,
  },
  {
    month: "March",
    city: "London",
    temperature: 3,
  },
  {
    month: "March",
    city: "Lagos",
    temperature: 4,
  },
  {
    month: "March",
    city: "Abuja",
    temperature: 5,
  },
  {
    month: "April",
    city: "Tokyo",
    temperature: 2,
  },
  {
    month: "April",
    city: "London",
    temperature: 19,
  },
  {
    month: "April",
    city: "Lagos",
    temperature: 21,
  },
  {
    month: "April",
    city: "Abuja",
    temperature: 7,
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 22,
  },
  {
    month: "May",
    city: "London",
    temperature: 15,
  },
  {
    month: "May",
    city: "Lagos",
    temperature: 12,
  },
  {
    month: "May",
    city: "Abuja",
    temperature: 23,
  },
  {
    month: "June",
    city: "Tokyo",
    temperature: 9,
  },
  {
    month: "June",
    city: "London",
    temperature: 19,
  },
  {
    month: "June",
    city: "Lagos",
    temperature: 8,
  },
  {
    month: "June",
    city: "Abuja",
    temperature: 14,
  },
  {
    month: "July",
    city: "Tokyo",
    temperature: 17,
  },
  {
    month: "July",
    city: "London",
    temperature: 18,
  },
  {
    month: "July",
    city: "Lagos",
    temperature: 22,
  },
  {
    month: "July",
    city: "Abuja",
    temperature: 24,
  },
  {
    month: "August",
    city: "Tokyo",
    temperature: 26,
  },
  {
    month: "August",
    city: "London",
    temperature: 27,
  },
  {
    month: "August",
    city: "Lagos",
    temperature: 28,
  },
  {
    month: "August",
    city: "Abuja",
    temperature: 30,
  },
];

const scale = {
  temperature: { min: 0 },
  city: {
    formatter: (v) => {
      return {
        London: "London",
        Tokyo: "Tokyo",
        Lagos: "Lagos",
        Abuja: "Abuja",
      }[v];
    },
  },
};

export function ListenerAnalytics() {
  return (
    <div>
      <div className="listener-activities-title">Listeners Analytics</div>
      <div className="listener-activities-date-range-picker">
        <DateRangePicker>
          <input type="text" className="form-control" />
        </DateRangePicker>
      </div>

      <Chart
        scale={scale}
        padding={[30, 20, 60, 40]}
        autoFit
        height={350}
        data={data}
        interactions={["element-active"]}
      >
        <Point position="month*temperature" color="city" shape="circle" />
        <Line
          shape="smooth"
          position="month*temperature"
          color="city"
          label="temperature"
        />
        <Tooltip shared showCrosshairs />
        <Legend
          background={{
            padding: [5, 100, 0, 36],
            style: {
              width: "100%",
            },
          }}
        />
      </Chart>
    </div>
  );
}
