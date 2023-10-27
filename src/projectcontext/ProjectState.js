import React, { useState } from "react";
import Projectcontext from "./projectContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { db } from "../Authentaction/Config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function ProjectState(props) {
  const [product, setProduct] = useState([]);
  const [showproductDetails, setShowProductDetails] = useState([]);
  const [myProduct, setMyProduct] = useState([]);
  const [showCategorywiseProduct, setShowCategorywiseProduct] = useState([]);
  const [raisedticket, setRaisedticket] = useState([])
  const [feedbackGivenByUser, setFeedbackGivenByUser] = useState([])
  const [credentials, setCredentials] = useState({
    
    email: "",
    productcategory: "",
    productid: "",
    status: "",
    productname: "",
    quantity: "",
  });

  
  const { email, status, productcategory, productname, quantity, productid } =
    credentials;
  const bookCollectionRef = collection(db, "cart");

  const handleclick = async () => {
    // if (customer.length > 0) {
    const responce = await fetch("https://dummyjson.com/products");
    const json = await responce.json();
    console.log(json.products);
    setMyProduct(json.products);
  };

  const navigate = useNavigate();
  const product_details = async (productID) => {
    console.log(productID);
    console.log(myProduct);
    const items = myProduct.filter((products) => {
      return products.id == productID;
    });

    setShowProductDetails(items);
    console.log(items);
    return items;
  };

  const timeout = () => {
    navigate("/");
  };
  const checkAuthority = () => {
    if (localStorage.getItem("email")) {
      if (localStorage.getItem("email").endsWith("@gmail.com")) {
        toast.error("Entry restricted", {
          position: "top-center",
          theme: "colored",
        });
        const myTimeOut = setTimeout(timeout, 5000);
      }
    }
  };

  const restrictUser = () => {
    if (localStorage.getItem("email") || localStorage.getItem("accesstoken")) {
      toast.error("Another session is going on! Please log-out first", {
        position: "top-center",
        theme: "colored",
      });
      const myTimeOut = setTimeout(timeout, 5000);
    }
  };
  const product_category = async (productcategory) => {
    console.log(productcategory);
    if (window.location.pathname != "/productcategory") {
      navigate("/productcategory");
    }
    const items = await myProduct.filter((products) => {
      console.log(products.category);
      return products.category == productcategory;
    });

    setShowCategorywiseProduct(items);
    console.log(items);
    return items;
  };

  // function for add items in cart is started
  const productCollectionRef = collection(db, "cart");

  const addProduct = (newproduct) => {
    return addDoc(productCollectionRef, newproduct);
  };

  const updateProduct = (id, updatedProduct) => {
    const productDoc = doc(db, "cart", id);
    return updateDoc(productDoc, updatedProduct);
  };

  const deleteProduct = (id) => {
    const productDoc = doc(db, "cart", id);
    return deleteDoc(productDoc);
  };

  const getAllProduct = () => {
    return getDocs(productCollectionRef);
  };

  const getIndividualProduct = (id) => {
    const productDoc = doc(db, "cart", id);
    return getDoc(productDoc);
  };

  const getProducts = async () => {
    const data = await getAllProduct();
    console.log(data.docs);
    setProduct(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const deletehandler = async (id) => {
    await deleteProduct(id);
    getProducts();
  };
  const addData = (newBooks) => {
    return addDoc(bookCollectionRef, newBooks);
  };
  

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

  // function for add item in cart is end

  // raised ticket start
  const raisedTicketCollectionRef = collection(db, "RaisedTicket");
  const feedbackgivenCollectionRef = collection(db, "feedback")
  const addTicket = (newticket) => {
    return addDoc(raisedTicketCollectionRef, newticket);
  };

  const updateTicket = (id, updatedTicket) => {
    const RaisedTicketDoc = doc(db, "RaisedTicket", id);
    return updateDoc(RaisedTicketDoc, updatedTicket);
  };

  const deleteRaisedTicket = (id) => {
    const RaisedTicketDoc = doc(db, "RaisedTicket", id);
    return deleteDoc(RaisedTicketDoc);
  };

  const getAllRaisedTicket = () => {
    return getDocs(raisedTicketCollectionRef);
  };

  const getIndividualRaisedTicket = (id) => {
    const RaisedTicketDoc = doc(db, "RaisedTicket", id);
    return getDoc(RaisedTicketDoc);
  };

  const getRaisedTicket = async () => {
    const data = await getAllRaisedTicket();
    console.log(data.docs);
    setRaisedticket(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const deleteRaisedTickethandler = async (id) => {
    await deleteRaisedTicket(id);
    getRaisedTicket();
  };
  const addRaisedTicket = (newBooks) => {
    return addDoc(raisedTicketCollectionRef, newBooks);
  };
  // raised ticket end

  // feedback given by people section start
  const getAllFeedback = () => {
    return getDocs(feedbackgivenCollectionRef);
  };

  const getFeedbacks = async () => {
    const data = await getAllFeedback();
    console.log(data.docs);
    setFeedbackGivenByUser(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  // feedback given by people section ens
    return (
    <>
      <Projectcontext.Provider
        value={{
          getFeedbacks,
          feedbackGivenByUser,
          setFeedbackGivenByUser,
          raisedticket,
          setRaisedticket,
          deleteRaisedTickethandler,
          product,
          getRaisedTicket,
          setProduct,
          deletehandler,
          handleSubmit,
          getProducts,
          addProduct,
          updateProduct,
          deleteProduct,
          getAllProduct,
          getIndividualProduct,
          timeout,
          product_category,
          showCategorywiseProduct,
          setShowCategorywiseProduct,
          handleclick,
          restrictUser,
          myProduct,
          checkAuthority,
          setMyProduct,
          product_details,
          showproductDetails,
          setShowProductDetails,
        }}
      >
        {props.children}
      </Projectcontext.Provider>
      <ToastContainer />
    </>
  );
}

export default ProjectState;