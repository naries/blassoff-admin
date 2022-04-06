import React from "react";
import { useAudio } from "../modules/AudioPlayer";
import Play from "../assets/svg/play.svg";
import Stop from "../assets/svg/stop.svg";
import Bar from "./Bar";
import "../styles/AudioPlayer.css";

const AudioPlayer = ({ episode, blobDuration }) => {
    const [playing, toggle, duration, currentTime, setClickedTime] = useAudio(episode);

    return (
        <div className="d-flex flex-row align-items-center">
            {duration && <div onClick={toggle} className="mr-2">
                {playing
                    ? <img src={Stop} alt="stop" />
                    : <img src={Play} alt="play" />
                }
            </div>}
            <Bar currentTime={currentTime} duration={duration === Infinity ? blobDuration : duration} onTimeUpdate={(time) => setClickedTime(time)} />
        </div>
    );
};

export default AudioPlayer;
