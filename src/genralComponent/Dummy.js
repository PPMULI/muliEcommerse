import React, { useState, useContext } from "react";
import AdminNav from "../AdminComponents/AdminNav";
import image from "../Images/bghome.png";
import projectcontext from "../projectcontext/projectContext";
import { useEffect } from "react";

function Dummy() {
  const context = useContext(projectcontext);
  const {
    getProductsThat_You_Buy,
    YourOrder,
    Update_user_orders_ForAdmin,
    Reject_user_orders_By_Admin,
  } = context;

  const [credentials, setCredentials] = useState({
    reasonofrejection: "",
  });

  const { reasonofrejection } = credentials;
  console.log(credentials);
  useEffect(() => {
    getProductsThat_You_Buy();
  }, []);
  return (
    <>
      <AdminNav />

      <div className="your_cart">
        <h4 className="user_orders">User Orders</h4>
        <div className="container">
          <div className="row">
            {YourOrder &&
              YourOrder.map((value) => {
                return (
                  <>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                      <div class="card total_user_order">
                        <div className="row">
                          <div className="col-lg-2">
                            <img
                              src={image}
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
                            <ul className="product_status" >
                              <li>Status: </li>
                              <li>{value.status}</li>
                            </ul>
                          </div>

                          <div className="col-lg-3 action_buttons">
                            <button className="btn btn-outline-primary accept_button">Accept</button>
                            <button className="btn btn-outline-success accept_button">Accept</button>
                            <button className="btn btn-outline-danger accept_button">Accept</button>
                          </div>
                        </div>
                      </div>{" "}
                    </div>

                    <div className="col-lg-2"></div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dummy;
