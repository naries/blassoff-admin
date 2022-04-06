import React from "react";
import CommentsAvatar from "../../../assets/svg/comments-avatar.svg";
import PodImg from "../../../assets/svg/comment-pod-img.svg";
import "./style.css";

export const CommentsWidget = () => {
  return (
    <div className="comments-container">
      <div className="comments--title">Latest comments</div>
      <div className="comments--sub-title">
        Podcast comments I haven't responded to
      </div>
      <div className="comments--list">
        <div className="comments--list-item">
          <img src={CommentsAvatar} alt="comments avatar" />
          <div className="comment--content">
            <div className="comment--content-time">
              Julietté La Pearl • 3 weeks ago
            </div>
            <div className="comment-txt">
              PURE TALENT!!!!!!!! Doing it in the NIGER DELTA STYLE..
            </div>
          </div>
          <img src={PodImg} alt="pod img" />
        </div>
        <div className="comments--list-item">
          <img src={CommentsAvatar} alt="comments avatar" />
          <div className="comment--content">
            <div className="comment--content-time">
              Julietté La Pearl • 3 weeks ago
            </div>
            <div className="comment-txt">
              PURE TALENT!!!!!!!! Doing it in the NIGER DELTA STYLE..
            </div>
          </div>
          <img src={PodImg} alt="pod img" />
        </div>
        <div className="comments--list-item">
          <img src={CommentsAvatar} alt="comments avatar" />
          <div className="comment--content">
            <div className="comment--content-time">
              Julietté La Pearl • 3 weeks ago
            </div>
            <div className="comment-txt">
              PURE TALENT!!!!!!!! Doing it in the NIGER DELTA STYLE..
            </div>
          </div>
          <img src={PodImg} alt="pod img" />
        </div>
      </div>

      <div className="comments--view-more">
        VIEW MORE
      </div>
    </div>
  );
};
