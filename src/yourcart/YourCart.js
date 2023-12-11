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
  const [credentials, setCredentials] = useState({reasonofrejection: "", actionby: ""})
  const context = useContext(projectcontext);
  const {
    handleclick,
    myProduct,
    setMyProduct,
    getProducts,
    product,
    setProduct,
    deletehandler,
    Buy_the_product
  } = context;

  const {reasonofrejection, actionby} = credentials
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    handleclick();
  }, []);
  console.log(typeof myProduct);

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
    console.log(email);
    console.log(product);
    const items = await product.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);
    console.log(items);
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
        <h1 className="your_cart_heading">Your Cart</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              {productbyEmail &&
                productbyEmail.map((value) => {
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
                                <div className="col-lg-6">
                                 </div>

                                <div className="col-lg-6">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <button  onClick={(e) => {
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
                                      credentials.actionby
                                    );
                                  }} className="btn btn-outline-success">
                                        Buy Now
                                      </button>
                                    </div>

                                    <div className="col-lg-6">
                                      <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        deletehandler(value.id)
                                      }}
                                      className="btn btn-outline-danger">
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

export default YourCart;
