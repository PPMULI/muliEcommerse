import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectcontext from "../projectcontext/projectContext";
import { ShoppingBag } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import hurryup from "../Images/hurryup.jpg";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Navbar from "../genralComponent/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Authentaction/Config";

function ProductinfoCard(props) {
  const context = useContext(projectcontext);
  const { product_details, handleclick, myProduct, setMyProduct, showproductDetails, setShowProductDetails } = context;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    product_details(localStorage.getItem("productID"))
  }, []);

  console.log(showproductDetails)
  

  const navigate = useNavigate();
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
      <div className="container product_details">
        {showproductDetails &&
          showproductDetails.map((value) => {
            console.log(value.images[0]);
            return (
              <>
                <div className="row">
                  <div className="col-lg-3">
                    <div class="card productImage">
                      <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <img
                              src={value.images[0]}
                              class="d-block w-100"
                              alt="..."
                            />
                          </div>
                          <div class="carousel-item active">
                            <img
                              src={value.images[1]}
                              class="d-block w-100"
                              alt="..."
                            />
                          </div>{" "}
                          <div class="carousel-item active">
                            <img
                              src={value.images[2]}
                              class="d-block w-100"
                              alt="..."
                            />
                          </div>
                          <div class="carousel-item active">
                            <img
                              src={value.images[3]}
                              class="d-block w-100"
                              alt="..."
                            />
                          </div>
                          <div class="carousel-item">
                            <img
                              src={value.thumbnail}
                              class="d-block w-100"
                              alt="..."
                            />
                          </div>
                        </div>
                        <button
                          class="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExample"
                          data-bs-slide="prev"
                        >
                          <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button
                          class="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExample"
                          data-bs-slide="next"
                        >
                          <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>
                      <div class="card-body">
                        <p class="card-text">
                          <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-5">
                              <button
                                type="button"
                                class="btn btn-outline-success productinfobuttons"
                              >
                                <ShoppingBag /> Buy Now
                              </button>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-5 ">
                              <button
                                type="button"
                                class="productinfobuttons btn btn-outline-warning"
                              >
                                <AddShoppingCartIcon /> Warning
                              </button>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2"></div>

                  <div className="col-lg-6">
                    <h1 className="product_title">{value.title}</h1>
                    <button type="button" class="btn btn-success ratingbutton">
                      <StarIcon />
                      {value.rating}
                    </button>
                    {value.stock} {value.category} Available{" "}
                    <img src={hurryup} className="hurryup" alt="" />
                    <h2 className="product_price">
                      {" "}
                      <CurrencyRupeeIcon />
                      {value.price}{" "}
                      <span className="orignal_price">
                        {" "}
                        {Math.floor(
                          (value.price * 100) / value.discountPercentage
                        )}{" "}
                      </span>
                    </h2>
                    <h4 className="available_offers">Available offers Bank</h4>
                    <ul>
                      <li>
                        <LocalOfferIcon className="offer_icon" />{" "}
                        <b>Bank Offer</b> 10% off on Kotak Bank Credit Card, up
                        to ₹750 on orders of ₹5,000 and aboveT&C
                      </li>
                      <li>
                        <LocalOfferIcon className="offer_icon" />{" "}
                        <b>Bank Offer </b> 10% off on RBL Bank Credit Card, up
                        to ₹750 on orders of ₹5,000 and aboveT&C
                      </li>
                      <li>
                        <LocalOfferIcon className="offer_icon" />{" "}
                        <b>Bank Offer </b> 10% off on SBI Credit Card, up to
                        ₹750 on orders of ₹5,000 and aboveT&C
                      </li>
                      <li>
                        <LocalOfferIcon className="offer_icon" />{" "}
                        <b>Special PriceGet</b> extra ₹8000 off (price inclusive
                        of cashback/coupon)T&C
                      </li>
                    </ul>
                    <h4 className="product_description">Product Description</h4>
                    <ul>
                      <li> {value.description}</li>
                    </ul>
                    <h4 className="product_description">Brand</h4>
                    <li>
                      {" "}
                      <strong> {value.brand} </strong>
                    </li>
                    <hr />
                    <h4 className="product_description">Seller Info</h4>
                    <li>
                      <b>Name:</b>Pritam Muli
                    </li>
                    <li>
                      <b>GST No.</b>07AAAAA1234A1Z1
                    </li>
                    <hr />
                    <h4 className="product_description">Address Saved</h4>
                    <div class="card">
                      <div className="row">
                        <div className="col-lg-8"></div>
                        <div className="col-lg-2"></div>
                        <div
                          className="col-lg-1"
                          onClick={() => {
                            alert("edit");
                          }}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="col-lg-1"
                          onClick={() => {
                            alert("delete");
                          }}
                        >
                          <DeleteSweepIcon />
                        </div>
                      </div>
                      <div class="card-body">
                        Garakheda Parisar, Mehar nagar, Sambhaji Nagar
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-1"></div>
                      <div className="col-lg-5 ">
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            localStorage.setItem("productid", value.id);
                            localStorage.setItem("status", "pending");
                            localStorage.setItem("productbrand", value.title);
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
                      <div className="col-lg-5">
                        <button
                          type="button"
                          class="details_buttons btn btn-success favorite_button"
                        >
                          <FavoriteBorderIcon /> Add To Favourite
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default ProductinfoCard;
