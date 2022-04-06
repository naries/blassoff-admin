import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LandingHeader } from "./LandingHeader";
import "./landing.css";
import { Wrapper } from "./Wrapper";
import { Features } from "./Features";
import { ExcitingFeatures } from "./ExcitingFeatures";
import { FAQ } from "./FAQ";

const Landing = () => {
  return (
    <div className="landing-container">
      <Header />
      <Wrapper>
        <LandingHeader />
        <Features />
        <ExcitingFeatures />
        <FAQ />
        <Footer />
      </Wrapper>
    </div>
  );
};
export default Landing;
