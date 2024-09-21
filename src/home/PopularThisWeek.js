import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import projectcontext from "../projectcontext/projectContext";

function PopularThisWeek() {
  const context = useContext(projectcontext);
  const { fetctNewFeatured, newfeatured } = context;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const nextImage = () => {
    if (currentImageIndex < newfeatured.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  return (
    <>
      <div>
        <h1 className="featured_heading">Popular This Week</h1>
        <div className="container featured">
          <div className="row">
            {newfeatured &&
              newfeatured.slice(0, 8).map((value, index) => {
                console.log(value)
                return (
                  <>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div>
                        <div class="card popular_product_list">
                          <div class="card-body">
                            <div
                              id={`carouselExampleIndicators${index}`}
                              class="carousel slide"
                            >
                              <div class="carousel-ndicators">
                                {value.images.map((_, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    data-bs-target={`#carouselExampleIndicators${index}`}
                                    data-bs-slide-to={i}
                                    className={
                                      i === currentImageIndex ? "active" : ""
                                    }
                                    aria-label={`Slide ${i + 1}`}
                                  ></button>
                                ))}
                              </div>
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                  <div className="row">
                                    <div className="col-lg-5">
                                      <img
                                        src={value.images[currentImageIndex]}
                                        class="d-block w-100 popular_this_week_image"
                                        alt="..."
                                        onClick={() => {
                                          localStorage.setItem(
                                            "productID",
                                            value.id
                                          );
                                          navigate("/productdetails");
                                        }}
                                      />
                                    </div>

                                    <div className="col-lg-7">
                                      <h5 className="card-title popular_this_week_caption">
                                        {value.title} 
                                        <br />
                                        {value.price}
                                        <br />
                                        {value.rating}
                                      </h5>
                                    </div>
                                  </div>

                                  <h5>
                                    <form action="">
                                      <div className="uiui">
                                        <div className="wrapper"></div>
                                      </div>
                                    </form>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <p className="card-title figure_caption">
                          {value.title}
                        </p> */}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularThisWeek;
