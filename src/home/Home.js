import React from "react";
import Navbar from "../genralComponent/Navbar";
import "../genralComponent/Global.css";

import OfferSection from "./OfferSection";
import Categories from "./Categories";
import NewArrival from "./NewArrival";
import Featured from "./Featured";
import PopularThisWeek from "./PopularThisWeek";
import WhyChooseUs from "./WhyChooseUs";
function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <OfferSection />
        <Categories />
        <NewArrival />
        <Featured />
        <PopularThisWeek />
        <WhyChooseUs />
      </div>
    </>
  );
}

export default Home;
