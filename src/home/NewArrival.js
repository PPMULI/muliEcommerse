import React from "react";
import ExpensiveLaptop from "../Images/NewArrival/ExpensiveLaptiop.jpeg";
import mobile5G from "../Images/NewArrival/SmartPhone5G.jpeg";
import ExpensivePerfume from "../Images/NewArrival/perfume.jpeg";
import ExpensiveLaptop2 from "../Images/NewArrival/ExpensiveLaptiop1.jpeg";
import mobile from "../Images/NewArrival/mobile.jpeg";

function NewArrival() {
  return (
    <>
      <h2>New Arrival</h2>
      <div className="row featured">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="row new_arrival_details">
            <div className="col-lg-6 col-md-6 col-sm-6 col-8 new_arrival_laptop_image">
              <div class="card ExpensiveLaptop_card">
                <img src={ExpensiveLaptop} class="card-img-top new" alt="..." />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-4 new_arrival_laptop_details">
              <p>
                Gaming Laptop <br />
                99,999{" "}
              </p>
              <br />
              <button className="btn-secondary Add_to_cart_new_arrival">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-1"></div> */}

        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="row new_arrival_details">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div class="card new_arrival_card_section2">
                <img src={mobile5G} class="card-img-top new_arrival_images" alt="..." />
                <div class="card-body">
                  <p class="card-text">
                    5G Smartphone <br />
                    120$
                  </p>
                </div>
              </div>
            </div>
 
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div class="card new_arrival_card_section2">
                <img src={ExpensiveLaptop2} class="card-img-top new_arrival_images" alt="..." />
                <div class="card-body">
                  <p class="card-text">
                     Laptop <br />
                     50000 onwards
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div class="card new_arrival_card_section2">
                <img src={mobile} class="new_arrival_images card-img-top" alt="..." />
                <div class="card-body">
                  <p class="card-text">
                    Smart Phones <br />
                    10000 onward
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div class="card new_arrival_card_section2">
                <img src={ExpensivePerfume} class="card-img-top new_arrival_images" alt="..." />
                <div class="card-body">
                  <p class="card-text">
                    Latest Perfumes 
                    <br />
                    1000 onward
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewArrival;
