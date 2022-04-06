import React from "react";
import { PodDialog } from "../../../../components/PodDialog";
import { Chart, Path } from "bizcharts";
import ChartLike from "../../../../assets/svg/chart-like.svg";
import "./style.css";

const data = [
  { consumption: 0.65, price: 1, year: 1965 },
  { consumption: 0.66, price: 1.05, year: 1966 },
  { consumption: 0.64, price: 1.1, year: 1967 },
  { consumption: 0.63, price: 1.12, year: 1968 },
  { consumption: 0.55, price: 1.15, year: 1969 },
  { consumption: 0.57, price: 1.19, year: 1970 },
  { consumption: 0.58, price: 1.14, year: 1971 },
  { consumption: 0.59, price: 1, year: 1972 },
  { consumption: 0.57, price: 0.96, year: 1973 },
  { consumption: 0.55, price: 0.92, year: 1974 },
  { consumption: 0.54, price: 0.88, year: 1975 },
  { consumption: 0.55, price: 0.87, year: 1976 },
  { consumption: 0.42, price: 0.89, year: 1977 },
  { consumption: 0.28, price: 1, year: 1978 },
  { consumption: 0.15, price: 1.1, year: 1979 },
];

const scale = {
  price: {
    min: 0,
    max: 1.5,
  },
  year: {
    range: [0.05, 0.95],
  },
};

export const Likes = (props) => {
  const { showLikesDialog, setShowLikesDialog } = props;
  return (
    <PodDialog show={showLikesDialog} onHide={setShowLikesDialog}>
      <div className="published-modal-container">
        <div className="d-flex flex-column align-items-center">
          <div className="dashboard-modal--title">{props?.totalLikes}</div>
          <div className="dashboard-modal--sub-title">
            Total Likes <img src={ChartLike} alt="tick" />
          </div>
        </div>

        <div className="dashboard-modal--graph-card">
          <div className="dashboard-graph--head">
            <div className="dashboard-graph--left">
              Podcast growth Total following
            </div>
            <div className="dashboard-graph--right">Range Picker</div>
          </div>
          <div className="published-chart">
            <Chart height={200} autoFit data={data} scale={scale}>
              <Path
                animate={{
                  appear: {
                    animation: "path-in",
                    duration: 1000,
                    easing: "easeLinear",
                  },
                }}
                shape="smooth"
                position="year*price"
              />
            </Chart>
          </div>
        </div>
      </div>
    </PodDialog>
  );
};
