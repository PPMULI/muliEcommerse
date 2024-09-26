import React, { useContext, useEffect, useState } from "react";
import Navbar from "../genralComponent/Navbar";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";
import cancel from "../Images/cancelorder.jpg";
import resolve from "../Images/resolve.jfif";
import rejected from "../Images/rejected.jfif";
import { useNavigate } from "react-router-dom";
import emptybasket from "../Images/empty-basket.png";
function MyOrder() {
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
    // Buy_the_product,
    proceed_To_pay,
    // getCartItemsByEmail,
    // productbyEmail,
  } = context;

  useEffect(() => {
    confirm_login();
  }, []);
  const { reasonofrejection, actionby } = credentials;
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCartItemsByEmail(localStorage.getItem("email"));
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const bookCollectionRef = collection(db, "order");
  const getCartItemsByEmail = async (email) => {
    const items = await product.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);

    console.log("items", items);
    return items;
  };

  console.log(productbyEmail);
  console.log(product);
  return (
    <>
      <Navbar />
      <button
        onClick={() => {
          getCartItemsByEmail(localStorage.getItem("email"));
        }}
      >
        Click me
      </button>
      <div className="new_myOrder_background">
        <div className="row">
          <div className="col-lg-8">
            <div className="container pt-2">
              <div className="your_order">
                <div className="order_count_table">MySite - 1 </div>

                <div className="order_count_table">MySite - 2</div>
              </div>

              <div className="new_deliver_address">
                <div>
                  Deliver To: <span className="customer_name">Atharv Muli</span>{" "}
                  <br /> <p>Garakheda</p>
                </div>

                <div>
                  <button className="btn change_button">Change</button>
                </div>
              </div>

              <div className="Your_order_items mt-2">
                <div className="container">
                  <div className="row">
                    {productbyEmail.length == 0 ? (
                      <>
                      <div className="empty-basket-image">

                        <img src={emptybasket} className="empty-baset-image" alt="" />
                        <p>Your Basket is empty</p>

                        <div className="cart_buttons">
                          <button className="shop_now">Shop Now</button>
                          <button className="refesh_button">Refresh</button>
                        </div>
                      </div>
                      </>
                    ) : (
                      productbyEmail.map((value) => {
                        console.log(value);
                        return (
                          <>
                            <div className="col-lg-3 text-center">
                              <img src={value.imageurl} alt="" />
                            </div>

                            <div className="col-lg-9 your_cart_items">
                              <div>
                                <h4>
                                  {value.productcategory}, {value.productname}
                                </h4>
                                <p>Rs. {value.price}</p>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deletehandler(value.id);
                                  }}
                                >
                                  REMOVE
                                </button>
                              </div>

                              <div className="items-end">Fastest Deliver</div>
                            </div>

                            <hr />
                          </>
                        );
                      })
                    )}
                  </div>
                </div>

                <hr />
              </div>
            </div>
          </div>

          <div className="col-lg-4 payment_section mt-2">
            <p className="payment_details">PAYMENT DETAILS</p>
            <hr />

            <div id="payment_description">
              <div className="payment_description">
                <div>Product Price (7 item)</div>
                <div>-729</div>
              </div>

              <div className="payment_description">
                <div>Platform fee</div>
                <div>-30</div>
              </div>

              <div className="payment_description">
                <div>Delivery Charges</div>
                <div>-free</div>
              </div>
            </div>

            <div className="total_payment">
              <h3>Total Payment</h3>
              <h3>-1000</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrder;
