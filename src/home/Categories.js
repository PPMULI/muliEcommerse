import React from "react";
import laptopIcon from "../Images/icon/LaptopIcon.jpeg"
import monbiler from "../Images/icon/mobileicon.jpeg"
import fregrences from "../Images/icon/fregrence.png"
import skincare from "../Images/icon/skincare.jpeg"
import Homeappliences from "../Images/home-decoration.jpg"
import food from "../Images/icon/food.jpeg"
function Categories() {
  return (
    <>
      <div className="categories">
        <h2>Categories</h2>

    
          <div className="row featured p-1">
            <div className="col-lg-2 col-md-3 mt-3 col-sm-4 col-6">
              <div class="card icon_images">
                <img src={laptopIcon} class="card-img-top product_icons" alt="..." />
                <div class="card-body">
                  <h5 class="card-title icon_title">Laptop</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 mt-3 col-sm-4 col-6">
              <div class="card icon_images">
                <img src={monbiler} class="card-img-top product_icons" alt="..." />
                <div class="card-body">
                  <h5 class="card-title icon_title">Mobile</h5>
                </div>
              </div>
            </div>{" "}
            <div className="col-lg-2 mt-3 col-md-3 col-sm-4 col-6">
              <div class="card icon_images">
                <img src={fregrences} class="card-img-top product_icons" alt="..." />
                <div class="card-body">
                  <h5 class="card-title icon_title">Fregrence</h5>
                </div>
              </div>
            </div>

 
            <div className="col-lg-2 col-md-3 mt-3 col-sm-4 col-6">
              <div class="card icon_images">
                <img src={skincare} class="card-img-top product_icons" alt="..." />
                <div class="card-body">
                  <h5 class="card-title icon_title">Skin Care</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mt-3 col-sm-4 col-6">
              <div class="card icon_images">
                <img src={Homeappliences} class="card-img-top product_icons" alt="..." />
                <div class="card-body">
                  <h5 class="card-title icon_title">Home Appliences</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mt-3 col-sm-4 col-6">
              <div class="card icon_images">
                <img src={food} class="card-img-top product_icons" alt="..." />
                <div class="card-body">
                  <h5 class="card-title icon_title">Food</h5>
                </div>
              </div>
            </div>
          </div>
     
      </div>
    </>
  );
}

export default Categories;
