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
        <h1 className="your_cart_heading">Your Orders</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              {ProductbyEmail &&
                ProductbyEmail.map((value) => {
                  console.log(value);
                  return (
                    <>
                      <div className="col-lg-12">
                        <div class="card cart_items">
                          <div class="card-body">
                            <div className="row">
                              <div className="col-lg-6">
                                <p className="user_email">{value.email}</p>
                              </div>

                              <div className="col-lg-6">
                                <p className="order_status">{value.id}</p>
                              </div>

                              <div className="col-lg-6">
                                Details:
                                <ul>
                                  <li>Price: {value.price}</li>
                                  <li>
                                    Product Category: {value.productcategory}
                                  </li>
                                  <li>Product Name: {value.productname}</li>
                                  <li>Product ID: {value.productid}</li>
                                  <li>Quantity: {value.quantity}</li>
                                </ul>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-lg-6"></div>

                                <div className="col-lg-6">
                                  <div className="row">
                                    <div className="col-lg-6">
                                
                                    </div>

                                    <div className="col-lg-6">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          Cancel_order_handler(value.id);
                                        }}
                                        className="btn btn-outline-danger"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyOrder;
