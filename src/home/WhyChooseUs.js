import React from "react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function WhyChooseUs() {
  return (
    <>
      <h1 className="featured_heading">Why Choose Us</h1>

      <div className="why_choose_us_background mb-3 featured">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card why_choose_us_card">
              <div class="card-body choose_us">
                <LocalShippingIcon className="why_choose_us_icon" />
                <h1>Free Delivery</h1>{" "}
                <p class="card-text facitilities">
                  This free shipping only for selected region
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card why_choose_us_card">
              <div class="card-body choose_us">
                <PaymentIcon className="why_choose_us_icon" />
                <h1>Easy Payment</h1>{" "}
                <p class="card-text facitilities">
                This free shipping
only for selected region                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card why_choose_us_card">
              <div class="card-body choose_us">
                <EmojiEventsIcon className="why_choose_us_icon" />
                <h1>Warrenty</h1>{" "}
                <p class="card-text facitilities">
                  This free shipping only for selected region
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="card why_choose_us_card">
              <div class="card-body choose_us">
                <SupportAgentIcon className="why_choose_us_icon" />
                <h1>Free Delivery</h1>{" "}
                <p class="card-text facitilities">
                  This free shipping only for selected region
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyChooseUs;
