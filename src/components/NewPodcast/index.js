import React from "react";
import { useParams } from "react-router";
import Home from "./Home/index.js";
import { StateProvider } from "./RecordingContext";

const NewPodcast = ({open, setOpen}) => {
  return (
    <StateProvider>
      <Home open={open} setOpen={setOpen} />
    </StateProvider>
  );
};

export default NewPodcast;
