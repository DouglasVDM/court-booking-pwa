import React from "react";
import HeroBanner from "./HeroBanner";
import AboutSection from "./AboutSection";
import MembershipSection from "./MembershipSection";
import FacilitiesSection from "./FacilitiesSection";

const HomePage:React.FC = () => {
  return (
    <>
      <HeroBanner />
      <AboutSection />
      <MembershipSection />
      <FacilitiesSection />
    </>
  );
};

export default HomePage;
