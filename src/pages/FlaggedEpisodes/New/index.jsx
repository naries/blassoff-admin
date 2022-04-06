import Podcast from "../../../assets/svg/podcast.svg";
import React, { useState } from "react";

import { RecordEpisode } from "./Record";
import { CreateEpisode } from "./Create";

import PlusElipse from "../../../assets/svg/plus-elipse-dark.svg";
import UploadElipse from "../../../assets/svg/upload-elipse.svg";
import "./style.css";
import "../../../assets/styles/forms.css";
import { BackButton } from "../../../components/BackButton";
import { useHistory, useParams } from "react-router";
import { UploadPodEpisode } from "./Create/PodEpisode";

export const NewEpisode = () => {
  const history = useHistory();
  let { show_id } = useParams();
  const [isCreate, setIsCreate] = useState(true);

  return (
    <div className="podcasts-container">
      <div className="podcasts-container--top">
        <div className="podcasts-container--top-left">
          <img src={Podcast} alt="pod title icon" />
          Podcast Episode
          <BackButton className="" onClick={() => history.goBack()} />
        </div>
        <div className="podcasts-container--top-right">&nbsp;</div>
      </div>

      <div className="new-pod-switch-container">
        <div className="new-pod-switch">
          <div
            className={`new-pod-switch-upload ${isCreate ? "active" : ""}`}
            onClick={() => setIsCreate(true)}
          >
            <img src={UploadElipse} alt="plus elipse" />
            Upload an Episode
          </div>
          <div className="new-pod-or">Or</div>

          <div
            className={`new-pod-switch-create ${isCreate ? "" : "active"}`}
            onClick={() => setIsCreate(false)}
          >
            <img src={PlusElipse} alt="plus elipse" />
            Record Episode
          </div>
        </div>
      </div>

      {isCreate ? (
        show_id ? (
          <UploadPodEpisode show_id={show_id} />
        ) : (
          <CreateEpisode />
        )
      ) : (
        <RecordEpisode />
      )}
    </div>
  );
};
