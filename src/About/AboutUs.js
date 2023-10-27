import React from "react";
import Navbar from "../genralComponent/Navbar";
import bghome from "../Images/bghome.png";
import laptop from "../Images/laptop.jpg";
import Footer from "../genralComponent/Footer";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="aboutus">
        <div className="our_info">
          <h1 className="our_mission">Our mission</h1>
          <h4 className="our_mission">To Provide most actionable app store</h4>

          <h2 className="about">About us</h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8 aboutus_info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequatur dolorum nihil itaque et quam, error labore
                dignissimos dolor aliquid soluta? Qui quibusdam quia eius
                facilis facere vel, debitis error placeat. Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Consequuntur sapiente
                possimus sunt molestias quod! Ab explicabo distinctio
                perferendis, sapiente beatae reprehenderit aspernatur aliquam
                quae ipsam nemo cum deleniti saepe quam nobis, quas, odio
                dolorem praesentium cupiditate consectetur. Sint eligendi
                corrupti voluptate nemo facere at asperiores? Dolores, assumenda
                tempore. Ipsum quia amet adipisci illo porro blanditiis impedit?
                Quisquam exercitationem neque iure, eveniet suscipit dolore ea
                quos architecto odit eos laboriosam sequi aut ex debitis et
                nobis illum reprehenderit similique libero molestiae quibusdam.
                Corrupti tenetur, nulla sequi amet dolore modi perspiciatis.
                Corrupti id unde corporis fugit minus ad architecto ipsam quo
                commodi quam, ex doloribus repudiandae deserunt vero ducimus ea,
                placeat modi amet quis molestiae animi. Consequatur cupiditate
                ad rem labore vitae accusantium et, dicta reprehenderit eveniet
                eius exercitationem placeat nulla amet, nihil voluptatibus! Nemo
                laboriosam aperiam itaque repellat et assumenda quae hic nam,
                dignissimos dolorem fuga nesciunt nobis,
              </div>
            </div>
          </div>
        </div>
        <div className="our_info leadership">
          <h1>Leadership</h1>
          <div className="container">
            <div className="row ">
              <div className="col-lg-6">
                <img src={bghome} className="leadership_images" alt="" />
                <h4 className="leadership_member">Harish Patil</h4>
                <h6>Senior Delivery Partner</h6>
              </div>

              <div className="col-lg-6">
                <img src={laptop} className="leadership_images" alt="" />
                <h4 className="leadership_member">Pritam Muli</h4>
                <h6>HOD Muli-E-Commerse</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
