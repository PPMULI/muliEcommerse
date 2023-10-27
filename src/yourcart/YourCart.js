import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../genralComponent/Navbar";
import { getBooks } from "../genralComponent/Dummy";
import { deletebook } from "../genralComponent/Dummy";
import Footer from "../genralComponent/Footer";
import projectcontext from "../projectcontext/projectContext";
import { db } from "../Authentaction/Config";
import { addDoc, collection } from "firebase/firestore";

function YourCart() {
  const [productbyEmail, setProductbyEmail] = useState([]);
  const context = useContext(projectcontext);
  const {
    handleclick,
    myProduct,
    setMyProduct,
    getProducts,
    product,
    setProduct,
    deletehandler,
  } = context;
  useEffect(() => {
    getProducts();
  }, []);

  const [credentials, setCredentials] = useState({
    email: "",
    productcategory: "",
    productid: "",
    status: "",
    productname: "",
    quantity: "",
  });

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const bookCollectionRef = collection(db, "order");

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
                Confirm To Buy
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
                    class="form-select d-none"
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
                                <p className="order_status">{value.status}</p>
                              </div>

                              <div className="col-lg-6">
                                <b>productID:</b> {value.id}
                              </div>
                              <div className="col-lg-6">
                                <button
                                  className="btn btn-danger cancel_order"
                                  onClick={(e) => {
                                    deletehandler(value.id);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="col-lg-6"></div>
                              <div className="col-lg-6">
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
                                  class="btn btn btn-success cancel_order buy_order btn-outline-warning product_action_buttons"
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                            <h5 class="card-title">{value.productname}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">
                              {" "}
                              {value.productcategory}
                            </h6>
                            <p>{value.quantity}</p>
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
