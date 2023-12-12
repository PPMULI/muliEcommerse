import React, { useContext, useEffect, useState } from "react";
import Navbar from "../genralComponent/Navbar";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";

function MyOrder() {
  const context = useContext(projectcontext);
  const {
    UserOrder_by_user_details,
    YourOrder,
    setYourOrder,
    Cancel_order_handler,
    getProductsThat_You_Buy,
    setyourOrderByUserdetails,
    yourOrderByUserdetails,
  } = context;
  const [ProductbyEmail, setProductbyEmail] = useState([]);

  useEffect(() => {
    getProductsThat_You_Buy();
  }, []);

  console.log(YourOrder);
  const getCartItemsByEmail = async (email) => {
    console.log(email);
    const items = await YourOrder.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);
    console.log(items);
    return items;
  };
  return (
    <>
      <Navbar />

      <div className="your_cart">
        <button
          onClick={() => {
            getCartItemsByEmail(localStorage.getItem("email"));
          }}
        >
          Refresh the list
        </button>
        <h4 className="user_orders">User Orders</h4>
        <div className="container">
          <div className="row">
            {ProductbyEmail &&
              ProductbyEmail.map((value) => {
                return (
                  <>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10">
                      <div class="card total_user_order">
                        <div className="row">
                          <div className="col-lg-2">
                            <img
                              src={value.imageurl}
                              class="card-img-top ordered_product_image"
                              alt="..."
                            />
                          </div>
                          <div className="col-lg-5">
                            <div class="card-body">
                              <h5 class="card-title">Product Details</h5>
                              <p class="card-text">
                                <ul>
                                  <li>Product name: {value.category}</li>
                                  <li>Brand: {value.brand}</li>
                                  <li>Price: {value.price}</li>
                                  <li>Quantity: {value.quantity}Q</li>
                                </ul>
                              </p>
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <ul className="product_status">
                              <li>Status: </li>
                              <li>{value.status}</li>
                            </ul>
                          </div>

                          <div
                            className="col-lg-3 action_buttons"
                            id="action_button"
                          >
                            {value.status == "pending" ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  Cancel_order_handler(value.id);
                                }}
                                className="btn btn-outline-danger"
                              >
                                Cancel order
                              </button>
                            ) : (
                              <button
                                disabled
                                onClick={(e) => {
                                  e.preventDefault();
                                  Cancel_order_handler(value.id);
                                }}
                                className="btn btn-outline-danger"
                              >
                                Cancel Order
                              </button>
                            )}
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

export default MyOrder;
