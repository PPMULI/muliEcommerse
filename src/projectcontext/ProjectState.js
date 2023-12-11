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
  const [YourOrder, setYourOrder] = useState([]);
  const [raisedticket, setRaisedticket] = useState([]);
  const [feedbackGivenByUser, setFeedbackGivenByUser] = useState([]);
  const [yourOrderByUserdetails, setyourOrderByUserdetails] = useState([]);
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

  const reducer = (state, action) => {
    if (state >= 1) {
      if (action.type == "INCREAMENT") {
        return state + 1;
      }

      if (action.type === "DECREAMENT") {
        return state - 1;
      }
    } else if (state < 1) {
      state = state + 1;
      return state;
    }
  };

  const orderCollectionRef = collection(db, "orders");

  const Order_product_collection = (neworder) => {
    return addDoc(orderCollectionRef, neworder);
  };
  const Buy_the_product = async (
    email,
    price,
    category,
    id,
    brand,
    quantity,
    reasonofrejection,
    status,
    actionby
  ) => {
    const newItem = {
      email,
      price,
      category,
      id,
      brand,
      quantity,
      reasonofrejection,
      status,
      actionby,
    };

    try {
      await Order_product_collection(newItem);
      toast.success(`Thank you for Purchase ${brand}`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const Cancel_Your_order = (id) => {
    const productDoc = doc(db, "orders", id);
    return deleteDoc(productDoc);
  };

  const Cancel_order_handler = async (id) => {
    await Cancel_Your_order(id);
    getProductsThat_You_Buy();
  };
  const getAllProductsThatYouBuy = () => {
    return getDocs(orderCollectionRef);
  };

  const getProductsThat_You_Buy = async () => {
    const data = await getAllProductsThatYouBuy();
    setYourOrder(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const UserOrder_by_user_details = async (email) => {
    console.log(YourOrder);
    const items = YourOrder.filter((cartdishes) => {
      return cartdishes.email == email;
    });

    setyourOrderByUserdetails(items);
    return items;
  };
  // function for add item in cart is end

  // raised ticket start
  const raisedTicketCollectionRef = collection(db, "RaisedTicket");
  const feedbackgivenCollectionRef = collection(db, "feedback");
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

  const RaisedTicket_collection = (newraisedticket) => {
    return addDoc(raisedTicketCollectionRef, newraisedticket);
  };
  const Reais_ticket_from_here = async (
    email,
    name,
    subject,
    concern,
    status,
    reasonofissue,
    solution,
    actionby
  ) => {
    console.log(
      email,
      name,
      subject,
      concern,
      status,
      reasonofissue,
      solution,
      actionby
    );
    const Your_raised_ticket = {
      email,
      name,
      subject,
      concern,
      status,
      reasonofissue,
      solution,
      actionby,
    };

    try {
      await RaisedTicket_collection(Your_raised_ticket);
      toast.success(
        `Your ticket is raised SuccessFully. Regfer My Raised Ticket`,
        {
          position: "top-center",
          theme: "colored",
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateSubjectOfRaisedTicketByUser = async (
    documentId,
    concern,
    subject
  ) => {
    console.log(documentId, concern, subject);
    try {
      // Reference to the specific document
      const orderDocRef = doc(raisedTicketCollectionRef, documentId);

      // Update the status field of the specific document

      const confurmaction = prompt(
        "Are you really want to update? If tes then enter Email"
      );

      if (confurmaction == localStorage.getItem("email")) {
        await updateDoc(orderDocRef, {
          concern: concern,
          subject: subject,
        });
        toast.success(`Congractulation! Your ticket is updated`, {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.error(`UnAutherised user`, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Add to cart

  const AddToCartCollectionRef = collection(db, "cart");

  const Add_To_cart_collection = (newcart) => {
    return addDoc(AddToCartCollectionRef, newcart);
  };
  const Add_To_Cart = async (
    email,
    price,
    productcategory,
    productid,
    productname,
    quantity
  ) => {
    const new_Cart = {
      email,
      price,
      productcategory,
      productid,
      productname,
      quantity,
    };

    try {
      await Add_To_cart_collection(new_Cart);
      toast.success(`${productname} is added in cart`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Projectcontext.Provider
        value={{
          Buy_the_product,
          Add_To_Cart,
          getFeedbacks,
          feedbackGivenByUser,
          setFeedbackGivenByUser,
          raisedticket,
          reducer,
          setRaisedticket,
          deleteRaisedTickethandler,
          product,
          getRaisedTicket,
          Cancel_order_handler,
          setProduct,
          deletehandler,
          getProducts,
          addProduct,
          updateProduct,
          deleteProduct,
          getAllProduct,
          getIndividualProduct,
          updateSubjectOfRaisedTicketByUser,
          timeout,
          product_category,
          showCategorywiseProduct,
          setShowCategorywiseProduct,
          getProductsThat_You_Buy,
          UserOrder_by_user_details,
          YourOrder,
          setYourOrder,
          setyourOrderByUserdetails,
          yourOrderByUserdetails,
          handleclick,
          restrictUser,
          myProduct,
          checkAuthority,
          setMyProduct,
          product_details,
          Reais_ticket_from_here,
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
