import React, { useContext, useEffect, useState } from "react";
import Navbar from "../genralComponent/Navbar";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";
import cancel from "../Images/cancelorder.jpg";
import resolve from "../Images/resolve.jfif";
import rejected from "../Images/rejected.jfif";
import { useNavigate } from "react-router-dom";
import emptybasket from "../Images/empty-basket.png";
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
    displayhello,
    deletehandler,
    handlePaymentChange,
    paymentdetails,
    setPaymentDetails,
    validatePaymentDetails,
    proceed_To_pay,
    ErrorInPayment,
    setErrorInPayment,
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

  let totalBill = 0;
  let total = (sum) => {
    totalBill = totalBill + sum;
    return totalBill;
  };

  let platformFee = 30;
  let yourTotalBill = 0;
  const totalBillToPay = (totalBill, platformFee) => {
    yourTotalBill = totalBill + platformFee;
    return yourTotalBill;
  };

  return (
    <>
      <Navbar />

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
                          <img
                            src={emptybasket}
                            className="empty-baset-image"
                            alt=""
                          />
                          <p>Your Basket is empty</p>

                          <div className="cart_buttons">
                            <button className="shop_now">Shop Now</button>
                            <button
                              className="refesh_button"
                              onClick={() => {
                                getCartItemsByEmail(
                                  localStorage.getItem("email")
                                );
                              }}
                            >
                              Refresh
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      productbyEmail.map((value) => {
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
                              {total(value.price)}
                              <div className="items-end">Fastest Deliver</div>
                            </div>

                            <hr />
                          </>
                        );
                      })
                    )}

                    <div className="place_order" id="Place_order">
                      <button
                        onClick={() => {
                          displayhello();
                        }}
                      >
                        Place Order
                      </button>
                    </div>
                    <form id="form" className="hidepaymerntform">
                      <div
                        className={`${
                          ErrorInPayment.cardholdername ? "has-error" : ""
                        }`}
                      >
                        {" "}
                        <label for="exampleInputEmail1" class="form-label">
                          Card Holder name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="cardholdername"
                          name="cardholdername"
                          onChange={handlePaymentChange}
                          aria-describedby="emailHelp"
                        />
                      </div>
                      {ErrorInPayment.cardholdername && (
                        <small className="text-danger">
                          Card holder name is required
                        </small>
                      )}

                      <div
                        className={`${
                          ErrorInPayment.cardnumber ? "has-error" : ""
                        }`}
                      >
                        {" "}
                        <label for="exampleInputPassword1" class="form-label">
                          Card Number
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handlePaymentChange}
                          id="cardnumber"
                          name="cardnumber"
                        />
                      </div>
                      {ErrorInPayment.cardnumber && (
                        <small className="text-danger">
                          Cardnumber is required
                        </small>
                      )}
                      <div className="row">
                        <div className="col-lg-6">
                          <div
                            className={`${
                              ErrorInPayment.cvv ? "has-error" : ""
                            }`}
                          >
                            {" "}
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                            >
                              CVV
                            </label>
                            <input
                              type="password"
                              class="form-control"
                              id="cvv"
                              name="cvv"
                              onChange={handlePaymentChange}
                            />
                          </div>
                          {ErrorInPayment.cvv && (
                            <small className="text-danger">
                              CVV is required
                            </small>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <div class="mb-3">
                            <label
                              for="exampleInputPassword1"
                              class="form-label"
                            >
                              Expiary
                            </label>
                            <input
                              type="month"
                              class="form-control"
                              id="expiary"
                              name="expiary"
                              onChange={handlePaymentChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="place_order">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            validatePaymentDetails(
                              localStorage.getItem("email"),
                              yourTotalBill,
                              productbyEmail,
                              "pending",
                              credentials.actionby,
                              paymentdetails.cardholdername,
                              paymentdetails.cardnumber,
                              paymentdetails.cvv,
                              paymentdetails.expiary
                            );
                          }}
                          type="submit"
                          class="btn btn-primary"
                        >
                          Confirm Order
                        </button>
                      </div>
                    </form>
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
                <div>{totalBill}</div>
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
            <div className="d-none">
              {totalBillToPay(totalBill, platformFee)}
            </div>

            <div className="total_payment">
              <h3>Total Payment</h3>
              <h3>{yourTotalBill}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourCart;

// import React, { useContext, useEffect } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../genralComponent/Navbar";
// import Footer from "../genralComponent/Footer";
// import projectcontext from "../projectcontext/projectContext";
// import { db } from "../Authetication/Config";
// // import { addDoc, collection } from "firebase/firestore";

// function YourCart() {
//   const [productbyEmail, setProductbyEmail] = useState([]);
//   const [credentials, setCredentials] = useState({
//     reasonofrejection: "",
//     actionby: "",
//   });
//   const context = useContext(projectcontext);
//   const {
//     handleclick,
//     myProduct,
//     confirm_login,
//     setMyProduct,
//     getProducts,
//     product,
//     setProduct,
//     deletehandler,
//     // Buy_the_product,
//     proceed_To_pay,
//     // getCartItemsByEmail,
//     // productbyEmail,
//   } = context;



//    useEffect(() => {
//     confirm_login();
//   }, []);
//   const { reasonofrejection, actionby } = credentials;
//   useEffect( () => {
//     getProducts();
//    }, []);

//    useEffect(() => {
//     getCartItemsByEmail(localStorage.getItem("email"))
//    }, [])
//   useEffect(() => {
//     handleclick();
//   }, []);

//   const navigate = useNavigate();
//   const handle_product_details = () => {
//     navigate("/productdetails");
//   };
//   const nextImage = () => {
//     if (currentImageIndex < myProduct.length - 1) {
//       setCurrentImageIndex(currentImageIndex + 1);
//     }
//   };

//   const previousImage = () => {
//     if (currentImageIndex > 0) {
//       setCurrentImageIndex(currentImageIndex - 1);
//     }
//   };
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // const bookCollectionRef = collection(db, "order");
//   const getCartItemsByEmail = async (email) => {
//     const items = await product.filter((products) => {
//       return products.email == email;
//     });

//     setProductbyEmail(items);

//     console.log("items", items);
//     return items;
//   };

//   return (
//     <>
//       {/* <pre>{JSON.stringify(product, undefined, 2)}</pre> */}
//       <Navbar />
 
//       <div className="your_cart">
//         <button
//         className="btn btn-outline-warning"
//           onClick={() => {
//             getCartItemsByEmail(localStorage.getItem("email"));
//           }}
//         >
//           Refresh the list
//         </button>

//         <h4 className="user_orders">Your Cart</h4>
//         <div className="container">
//           <div className="row">
//             {productbyEmail &&
//               productbyEmail.map((value) => {
//                 // console.log(value);
//                 return (
//                   <>
//                     {/* <div className="col-lg-1"></div> */}
//                     <div className="col-lg-11 col-md-11 col-sm-11 col-11">
//                       <div class="card total_user_order">
//                         <div className="row">
//                           <div className="emmil"></div>
//                           <div className="col-lg-2 col-md-2 col-sm-4 col-12">
//                             <img
//                               src={value.imageurl}
//                               class="card-img-top ordered_product_image"
//                               alt="..."
//                             />
//                           </div>
//                           {/* <div className="col-sm-3 col-lg-0 col-md-0 col-0"></div> */}

//                           <div className="col-lg-7 col-md-5 col-sm-8 col-12">
//                             {/* <div className="col-12 detalil"> */}
//                             <div class="card-body">
//                               <p class="card-text">
//                                 <ul className="product_details_list">
//                                   <h5 class="card-title">Product Details</h5>
//                                   <li>Product name: {value.productname}</li>
//                                   <li>Category: {value.productcategory}</li>
//                                   <li>Price: {value.price}</li>
//                                   <li>Quantity: {value.quantity}Q</li>
//                                 </ul>
//                               </p>
//                               {/* </div> */}
//                             </div>
//                           </div>

//                           {/* <div className="col-sm-2"></div> */}
//                           <div
//                             className="col-lg-3 col-md-3 col-sm-12 col-12 action_buttons"
//                             id="action_button"
//                           >
//                             <button
//                               className="btn btn-outline-success accept_button"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 proceed_To_pay(
//                                   localStorage.getItem("email"),
//                                   value.price,
//                                   value.productcategory,
//                                   value.id,
//                                   value.productname,
//                                   value.quantity,
//                                   credentials.reasonofrejection,
//                                   "pending",
//                                   credentials.actionby,
//                                   value.imageurl
//                                 );
//                               }}
//                             >
//                                Proceed To Pay
//                             </button>

//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 deletehandler(value.id);
//                               }}
//                               className="btn btn-outline-danger accept_button"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>{" "}
//                     </div>

//                     <div className="col-lg-1"></div>
//                   </>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default YourCart;
