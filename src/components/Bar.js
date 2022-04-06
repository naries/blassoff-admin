import React from "react";
import moment from "moment";
import "../styles/Bar.css";

export default function Bar(props) {
    const { duration, currentTime, onTimeUpdate } = props;

    const curPercentage = (currentTime / duration) * 100;

    function formatDuration(duration) {
        return moment.utc(moment.duration(duration, "seconds").asMilliseconds()).format(("mm:ss"))
    }

    const calcClickedTime = (e) => {
        const clickPositionInPage = e.pageX;
        const bar = document.querySelector(".progress-bar");
        const barStart = bar.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    const handleTimeDrag = (e) => {
        onTimeUpdate(calcClickedTime(e));

        const updateTimeOnMove = eMove => {
            onTimeUpdate(calcClickedTime(eMove));
        };

        window.addEventListener("mousemove", updateTimeOnMove);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", updateTimeOnMove);
        });
    }

    return (
        <div className="d-flex align-items-center">
            {duration ? (
                <div className="bar">
                    <span className="bar-time mr-1">{formatDuration(currentTime)}</span>
                    <div
                        className="progress-bar"
                        style={{
                            background: `linear-gradient(to right, orange ${curPercentage}%, orange 0)`
                        }}
                        onMouseDown={e => handleTimeDrag(e)}
                    >
                        <span
                            className="progress-bar-knob"
                            style={{ left: `${curPercentage - 2}%` }}
                        />
                    </div>
                    <span className="bar-time ml-1">{formatDuration(duration)}</span>
                </div>
            ) : (
                <span className="bar-time text-muted">Loading..</span>
            )}
        </div>
    );
}