import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../genralComponent/Navbar";
import { getBooks } from "../genralComponent/Dummy";
import { deletebook } from "../genralComponent/Dummy";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";
import { db } from "../Authentaction/Config";
// import { addDoc, collection } from "firebase/firestore";

function YourCart() {
  const [productbyEmail, setProductbyEmail] = useState([]);
  const [credentials, setCredentials] = useState({
    reasonofrejection: "",
    actionby: "",
  });
  const context = useContext(projectcontext);
  const {
    handleclick,
    myProduct,
    confirm_login,
    setMyProduct,
    getProducts,
    product,
    setProduct,
    deletehandler,
    Buy_the_product,
  } = context;

  useEffect(() => {
    confirm_login()
  }, [])
  const { reasonofrejection, actionby } = credentials;
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    handleclick();
  }, []);

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

  // const addData = (newBooks) => {
  //   return addDoc(bookCollectionRef, newBooks);
  // };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const bookCollectionRef = collection(db, "order");

  useEffect(() => {
    getCartItemsByEmail(localStorage.getItem("email"));
  }, []);

  const getCartItemsByEmail = async (email) => {
    const items = await product.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);
    return items;
  };
  return (
    <>
      {/* <pre>{JSON.stringify(product, undefined, 2)}</pre> */}
      <Navbar />
      <div className="your_cart">
        <button
          onClick={() => {
            getCartItemsByEmail(localStorage.getItem("email"));
          }}
        >
          Refresh the list
        </button>

        <h4 className="user_orders">Your Cart</h4>
        <div className="container">
          <div className="row">
            {productbyEmail &&
              productbyEmail.map((value) => {
                console.log(value);
                return (
                  <>
                    {/* <div className="col-lg-1"></div> */}
                    <div className="col-lg-11 col-md-11 col-sm-11 col-11">
                      <div class="card total_user_order">
                        <div className="row">
                          <div className="emmil"></div>
                          <div className="col-lg-2 col-md-2 col-sm-4 col-12">
                            <img
                              src={value.imageurl}
                              class="card-img-top ordered_product_image"
                              alt="..."
                            />
                          </div>
                          {/* <div className="col-sm-3 col-lg-0 col-md-0 col-0"></div> */}
             
                            <div className="col-lg-7 col-md-5 col-sm-8 col-12">
                              {/* <div className="col-12 detalil"> */}
                              <div class="card-body">
                                <p class="card-text">
                                  <ul className="product_details_list">
                                    <h5 class="card-title">Product Details</h5>
                                    <li>
                                      Product name: {value.productname}
                                    </li>
                                    <li>Category: {value.productcategory}</li>
                                    <li>Price: {value.price}</li>
                                    <li>Quantity: {value.quantity}Q</li>
                                  </ul>
                                </p>
                                {/* </div> */}
                              </div>
                            </div>

                            {/* <div className="col-sm-2"></div> */}
                            <div
                              className="col-lg-3 col-md-3 col-sm-12 col-12 action_buttons"
                              id="action_button"
                            >
                              <button
                                className="btn btn-outline-success accept_button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  Buy_the_product(
                                    localStorage.getItem("email"),
                                    value.price,
                                    value.productcategory,
                                    value.id,
                                    value.productname,
                                    value.quantity,
                                    credentials.reasonofrejection,
                                    "pending",
                                    credentials.actionby,
                                    value.imageurl
                                  );
                                }}
                              >
                                Buy
                              </button>

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  deletehandler(value.id);
                                }}
                                className="btn btn-outline-danger accept_button"
                              >
                                Remove
                              </button>
                            </div>
                  
                        </div>
                      </div>{" "}
                    </div>

                    <div className="col-lg-1"></div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default YourCart;
