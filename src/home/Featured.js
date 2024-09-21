import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectcontext from "../projectcontext/projectContext";

function Featured() {
  const context = useContext(projectcontext);
  const { fetctNewFeatured, newfeatured } = context;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    fetctNewFeatured();
  }, []);

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
    <div>
      <h1 className="featured_heading">Featured</h1>
      <div className="containe featured">
        <div className="row">
          {newfeatured &&
            newfeatured.slice(0, 12).map((value, index) => {
              console.log(value);
              return (
                <>
                  <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                    <div>
                      <div class="card product_list">
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
                                <img
                                  src={value.images[currentImageIndex]}
                                  class="d-block w-100 product_image"
                                  alt="..."
                                  onClick={() => {
                                    localStorage.setItem("productID", value.id);
                                    navigate("/productdetails");
                                  }}
                                />
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
                      <p className="card-title figure_caption">{value.title}</p>
                    </div>
                  </div>
                  
                </>
              );
            })}
         
        </div>
      </div>
    </div>
  );
}

export default Featured;
