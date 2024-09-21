import React from "react";
import Navbar from "../genralComponent/Navbar";
<<<<<<< HEAD
import "../genralComponent/Global.css";
=======
import projectcontext from "../projectcontext/projectContext";
import { useNavigate } from "react-router-dom";
import Bghome from "./Bghome";
>>>>>>> 2826a80f6addf8b887ccab8c876beaed72617ab3

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
