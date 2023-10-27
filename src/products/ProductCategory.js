import React, { useContext, useEffect, useState } from "react";
import Categorybuttons from "./Categorybuttons";
import projectcontext from "../projectcontext/projectContext";
import Navbar from "../genralComponent/Navbar";
import { useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Footer from "../genralComponent/Footer";
import { db } from "../Authentaction/Config";
import { addDoc, collection } from "firebase/firestore";

function ProductCategory() {
  const context = useContext(projectcontext);
  const navigate = useNavigate();
  const { showCategorywiseProduct } = context;
  console.log(showCategorywiseProduct);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    product_details,
    handleclick,
    myProduct,
    setMyProduct,
    showproductDetails,
    setShowProductDetails,
  } = context;

  const [credentials, setCredentials] = useState({
    email: "",
    productcategory: "",
    productid: "",
    status: "",
    productname: "",
    quantity: "",
  });

  useEffect(() => {
    // handleclick();
    product_details(localStorage.getItem("productID"));
  }, []);

  console.log(showproductDetails);

  const handle_product_details = () => {
    navigate("/productdetails");
  };
  const nextImage = () => {
    if (currentImageIndex < myProduct.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const addData = (newBooks) => {
    return addDoc(bookCollectionRef, newBooks);
  };

  const { email, status, productcategory, productname, quantity, productid } =
    credentials;
  console.log(credentials);
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const bookCollectionRef = collection(db, "cart");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newbook = {
      email: localStorage.getItem("email"),
      productcategory: localStorage.getItem("productcategory"),
      productname: localStorage.getItem("productbrand"),
      productid: localStorage.getItem("productid"),
      status: localStorage.getItem("status"),
      quantity,
    };

    console.log(newbook);

    try {
      await addData(newbook);
      alert(
        "Success",
        localStorage.removeItem("productid"),
        localStorage.removeItem("productname"),
        localStorage.removeItem("productbrand"),
        localStorage.removeItem("productcategory"),
        localStorage.removeItem("quantity"),
        localStorage.removeItem("status")
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Confirm To add Cart
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                {/* <form> */}
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    value={localStorage.getItem("email")}
                    disabled
                    onChange={onChange}
                    name="email"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="status"
                    value="pending"
                    disabled
                    onChange={onChange}
                    name="status"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={localStorage.getItem("productbrand")}
                    class="form-control"
                    disabled
                    onChange={onChange}
                    id="productname"
                    name="productname"
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Product Category
                  </label>
                  <input
                    type="text"
                    disabled
                    class="form-control"
                    id="productcategory"
                    onChange={onChange}
                    value={localStorage.getItem("productcategory")}
                    name="productcategory"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Product ID
                  </label>
                  <input
                    type="text"
                    disabled
                    class="form-control"
                    id="productid"
                    onChange={onChange}
                    value={localStorage.getItem("productid")}
                    name="productid"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Product Quantity
                  </label>
                  <select
                    class="form-select"
                    name="quantity"
                    id="quantity"
                    onChange={onChange}
                    aria-label="Default select example"
                  >
                    <option selected>---Select Quantity---</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  // console.log(email, productid, quantity,status,productcategory, productbrand  )
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Categorybuttons />
        <div className="row">
          {showCategorywiseProduct &&
            showCategorywiseProduct.map((value, index) => {
              return (
                <>
                  <div className="col-lg-3">
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
                                  <figcaption className="card-title figure_caption">
                                    {value.title}
                                  </figcaption>
                                </h5>
                                <button
                                  type="button"
                                  class="btn btn-outline-success product_action_buttons"
                                >
                                  <StoreIcon /> Buy
                                </button>
                                <button
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => {
                                    localStorage.setItem("productid", value.id);
                                    localStorage.setItem("status", "pending");
                                    localStorage.setItem(
                                      "productbrand",
                                      value.title
                                    );
                                    localStorage.setItem("quantity", 1);
                                    localStorage.setItem(
                                      "productcategory",
                                      value.category
                                    );
                                  }}
                                  class="btn btn-outline-warning product_action_buttons"
                                >
                                  <AddShoppingCartIcon /> Add To Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1"></div>
                </>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductCategory;
