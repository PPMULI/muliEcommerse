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
import { useReducer } from "react";

function ProductinfoCard(props) {
  const context = useContext(projectcontext);
  const {
    Buy_the_product,
    product_details,
    showproductDetails,
    reducer,
    myProduct,
    Add_To_Cart
  } = context;

  const [credentials, setCredentials] = useState({
    reasonofrejection: "",
    actionby: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let initialState = 1;
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // handleclick();
    product_details(localStorage.getItem("productID"));
  }, []);

  console.log(showproductDetails);

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

  return (
    <>
      <Navbar />

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
                                onClick={(e) => {
                                  e.preventDefault();
                                  Buy_the_product(
                                    localStorage.getItem("email"),
                                    value.price,
                                    value.category,
                                    value.id,
                                    value.brand,
                                    state,
                                    credentials.reasonofrejection,
                                    "pending",
                                    credentials.actionby
                                  );
                                }}
                              >
                                <ShoppingBag /> Buy Now
                              </button>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-5 ">
                              <button
                                type="button"
                                class="productinfobuttons btn btn-outline-warning"
                                onClick={(e) => {
                                  e.preventDefault();
                                  Add_To_Cart(
                                    localStorage.getItem("email"),
                                    value.price,
                                    value.category,
                                    value.id,
                                    value.brand,
                                    state
                                  );
                                }}
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
                    <form action="">
                      <div className="uiui">
                        <div className="wrapper">
                          {state == 1 ? (
                            <span
                              className="minus d-none"
                              onClick={() => dispatch({ type: "DECREAMENT" })}
                            >
                              -
                            </span>
                          ) : (
                            <span
                              className="minus"
                              onClick={() => dispatch({ type: "DECREAMENT" })}
                            >
                              -
                            </span>
                          )}

                          <span className="num" onChange={onchange} id="num">
                            {state}
                          </span>
                          <span
                            className="plus"
                            onClick={() => dispatch({ type: "INCREAMENT" })}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-lg-1"></div>
                      <div className="col-lg-5 ">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            Add_To_Cart(
                              localStorage.getItem("email"),
                              value.price,
                              value.category,
                              value.id,
                              value.brand,
                              state
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
                          class="details_buttons btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            Buy_the_product(
                              localStorage.getItem("email"),
                              value.price,
                              value.category,
                              value.id,
                              value.brand,
                              state,
                              credentials.reasonofrejection,
                              "pending",
                              credentials.actionby
                            );
                          }}
                        >
                          <ShoppingBag /> Buy Now
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
