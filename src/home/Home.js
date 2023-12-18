import React, { useContext } from "react";
import laptop from "../Images/laptop.jpg";
import perfumes from "../Images/perfumes.jpg";
import smartphone from "../Images/smartphone.jpg";
import Footer from "../genralComponent/Footer";
import Navbar from "../genralComponent/Navbar";
import projectcontext from "../projectcontext/projectContext";
import { useNavigate } from "react-router-dom";
import Dummy from "../genralComponent/Dummy";
import Bghome from "./Bghome";

function Home() {
  const context = useContext(projectcontext)
  const {product_category} = context

  const navigate = useNavigate()
  return (
    <>
    <Navbar />
    {/* <Dummy /> */}
      <Bghome />

      <h1 className="Our_Valuable_products">products</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <img src={laptop} className="Our_Valuable_products_image card-img-top" />
              <figcaption className="Our_Valuable_products_title">Laptop</figcaption>
             </div>
          </div>

          <div className="col-lg-1"></div>
          <div className="col-lg-3"> 
            <div className="card">
              <img src={smartphone} className="card-img-top Our_Valuable_products_image" />
              <figcaption className="Our_Valuable_products_title">Smart phone</figcaption>
             </div>
          </div>

          <div className="col-lg-2"></div>
          <div className="col-lg-3">
            <div className="card">
              <img src={perfumes} className="card-img-top Our_Valuable_products_image" alt="..." />
              <figcaption className="Our_Valuable_products_title" >Perfumes</figcaption>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
