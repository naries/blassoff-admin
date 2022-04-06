import React from "react";
import { Button } from "react-bootstrap";
import { getCategoryDetails } from "../store/category";
import { useSelector } from "react-redux";
import "../styles/Podcast.css";
import moment from "moment";

const Podcast = ({ data, setSelected }) => {
  const category = useSelector(getCategoryDetails);
  const { _id, title, category_id, updatedAt, episodeCount, image_url } = data;

  const lastUpdated = moment(updatedAt).fromNow();
  const podCategory =
    category &&
    category.data &&
    category.data.categories &&
    category.data.categories.filter(
      (value) => Number(value.category_id) === Number(category_id)
    );

  return (
    <div className="d-flex flex-row pod">
      <img src={image_url} alt="cover" width="118" height="120px" />
      <div className="podcast-details p-3">
        <div className="d-flex align-items-center mb-2">
          <div>
            <div className="pod-title cut-text mb-1">{title}</div>

            <div className="pod-label mb-1">
              <div className="d-flex flex-row">
                <div className="mr-1">Category: </div>
                <div className="pod-category cut-text-1">
                  {podCategory && podCategory[0].name}
                </div>
              </div>
            </div>
            <div className="pod-episodes mb-1">
              {episodeCount > 1
                ? `${episodeCount} Episodes`
                : `${episodeCount} Episode`}{" "}
            </div>
          </div>
        </div>
        <div>
          <hr
            style={{
              border: "1px solid #E0E0E0",
              marginBottom: 0,
              marginTop: 0,
            }}
          />
          <span className="pod-time text-break">
            Last updated: {lastUpdated}
          </span>
        </div>
        <div className="button-overlay align-items-center">
          <div className="d-flex justify-content-center">
            <div style={{ paddingTop: 41 }}>
              <Button variant="warning" onClick={() => setSelected(_id)}>
                View & Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
