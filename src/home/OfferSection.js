import React from 'react'
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import homeLogo from "../Images/homepage_image.png";
function OfferSection() {
  return (
    <>
      <div className="row offer_section">
      <img src={homeLogo} class="img-fluid featured" alt="..." />
        {/* <img src={homeLogo} alt="" /> */}
        {/* <div className="col-lg-3">
          <h1>
            Summer <br />
            Sale <br /> 50% off
          </h1>
          <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vero
          omnis alias reiciendis saepe incidunt enim, nemo cupiditate deserunt,
          iusto magni commodi laudantium et. In soluta quis quisquam dolorum
          sit!
          </p>
           <br />
            
          <button className="btn-secondary shop_now">
            Shop Now <ArrowRightAltIcon />{" "}
          </button>
        </div>
        <div className="col-lg-9 offer_section_image">
          <img src={homeLogo} className="home_page_image" alt="" />
        </div> */}
      </div>
    </>
  )
}
export default OfferSection
