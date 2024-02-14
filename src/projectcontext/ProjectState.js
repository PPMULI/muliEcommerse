import React, { useState } from "react";
import Projectcontext from "./projectContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Authentaction/Config";

function ProjectState(props) {
  const [sortByPrice, setSortByPrice] = useState(null);
  const [sortByRating, setSortByRating] = useState(null);
  const [deliveryProducts, setdeliveryProducts] = useState([]);
  const [productbyEmail, setProductbyEmail] = useState([]);
  const [product, setProduct] = useState([]);
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState([]);
  const [updatedticketStatus, setupdatedticketStatus] = useState([]);
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
    setMyProduct(json.products);
  };

  const navigate = useNavigate();
  const product_details = async (productID) => {
    const items = myProduct.filter((products) => {
      return products.id == productID;
    });

    setShowProductDetails(items);
    return items;
  };

  const timeout = () => {
    navigate("/");
  };
  const checkAuthority = () => {
    if (!localStorage.getItem("email")) {
      toast.error("login first", {
        position: "top-center",
        theme: "colored",
      });

      navigate("/");
    } else if (localStorage.getItem("email")) {
      if (localStorage.getItem("email").endsWith("@gmail.com")) {
        toast.error("Entry restricted", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/");
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
    if (window.location.pathname != "/productcategory") {
      navigate("/productcategory");
    }
    const items = await myProduct.filter((products) => {
      return products.category == productcategory;
    });

    setShowCategorywiseProduct(items);
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
    productname,
    quantity,
    reasonofrejection,
    status,
    actionby,
    imageurl,
    cardnumber,
    nameoncard,
    expirydate,
    CVV,
    country
  ) => {
    console.log(email.length)
 
      const newItem = {
        email,
        price,
        category,
        id,
        productname,
        quantity,
        reasonofrejection,
        status,
        actionby,
        imageurl,
        cardnumber,
        nameoncard,
        country,
        expirydate,
        CVV,
      };

      console.log(newItem);
      try {
        if (!localStorage.getItem("email")) {
          toast.error(`Please login first`, {
            position: "top-center",
            theme: "colored",
          });
          navigate("/adminlogin");
        } else {
          await Order_product_collection(newItem);
          toast.success(`Thank you for Purchase ${productname}`, {
            position: "top-center",
            theme: "colored",
          });
        }
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
    const items = YourOrder.filter((cartdishes) => {
      return cartdishes.email == email;
    });

    setyourOrderByUserdetails(items);
    return items;
  };

  // cancel the user order
  const reason_of_cancelThe_order = async (
    docID,
    reasontocancel,
    detailreasontocancel,
    status
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(orderCollectionRef, docID);

      // Update the status field of the specific document
      await updateDoc(orderDocRef, {
        reasontocancel: reasontocancel,
        detailreasontocancel: detailreasontocancel,
        status: status, // Set the status to "deliver"
      });
      toast.success(`Your order is cancel`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
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

        localStorage.removeItem("ticketsID");
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

  // re-open the ticket by user
  const reopen_the_ticketBy_user = async (
    documentId,
    status,
    concern,
    subject
  ) => {
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
          status: status,
        });
        toast.success(`Congractulation! Your ticket is updated`, {
          position: "top-center",
          theme: "colored",
        });

        localStorage.removeItem("reOpenTicketID");
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

  const Give_the_solution_by_admin = async (
    documentId,
    status,
    resolveby,
    reasonofissue,
    solutionofissue
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(raisedTicketCollectionRef, documentId);

      // Update the status field of the specific document

      const confurmaction = prompt(
        "Are you really want to update? If tes then enter Email"
      );

      if (confurmaction == localStorage.getItem("email")) {
        await updateDoc(orderDocRef, {
          status: status,
          actionby: resolveby,
          reasonofissue: reasonofissue,
          solution: solutionofissue,
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
  const confirm_login = () => {
    if (!localStorage.getItem("email")) {
      toast.error(`Please login first`, {
        position: "top-center",
        theme: "colored",
      });

      navigate("/");
    }
  };

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
    quantity,
    imageurl
  ) => {
    const new_Cart = {
      email,
      price,
      productcategory,
      productid,
      productname,
      quantity,
      imageurl,
    };

    try {
      if (!localStorage.getItem("email")) {
        toast.error(`Please login first`, {
          position: "top-center",
          theme: "colored",
        });
        navigate("/adminlogin");
      } else {
        await Add_To_cart_collection(new_Cart);
        toast.success(`${productname} is added in cart`, {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // update the order
  const Update_user_orders_ForAdmin = async (docID, status, actionby) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(orderCollectionRef, docID);

      // Update the status field of the specific document
      await updateDoc(orderDocRef, {
        status: status,
        actionby: actionby, // Set the status to "deliver"
      });
      toast.success(`Congractulation! Your status is updated`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const Reject_user_orders_By_Admin = async (
    docID,
    status,
    actionby,
    reasonofrejection
  ) => {
    try {
      // Reference to the specific document
      const orderDocRef = doc(orderCollectionRef, docID);

      // Update the status field of the specific document
      await updateDoc(orderDocRef, {
        status: status,
        actionby: actionby,
        reasonofrejection: reasonofrejection, // Set the status to "deliver"
      });
      toast.success(`Congractulation! Your status is updated`, {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // feedback from user
  const Customer_feedback_collection = collection(db, "customer_feedback");

  const Feedback_from_customer_collection = (newcustomerfeedback) => {
    return addDoc(Customer_feedback_collection, newcustomerfeedback);
  };
  const feedback_from_user = async (
    userID,
    email,
    customername,
    feedbackreletedto,
    leavetherating,
    moreaboutservice
  ) => {
    const Customer_feedback = {
      userID,
      email,
      customername,
      feedbackreletedto,
      leavetherating,
      moreaboutservice,
    };

    try {
      await Feedback_from_customer_collection(Customer_feedback);
      toast.success(`Your feedback is Register.`, {
        position: "top-center",
        theme: "colored",
      });
      localStorage.removeItem("feedbackformID");
    } catch (error) {
      console.log("error", error);
    }
  };

  // user/admin signup
  const handleSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        toast.success(`Your account is created successfully.`, {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Something wents wrong`, {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  // login the user
  const handleLogin = async (email, password) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      toast.success("Congratulations! You are logged-in", {
        position: "top-center",
        theme: "colored",
      });
      localStorage.setItem("accesstoken", auth.currentUser.accessToken);
      localStorage.setItem("email", auth.currentUser.email);
      const goThere = setTimeout(timeout, 3000);
      // You can redirect the user to a different page or perform other actions here
    } catch (error) {
      alert(
        toast.error("Invalid Credentials!", {
          position: "top-center",
          theme: "colored",
        })
      );
      console.error("Error signing in:", error);
      // Handle login error, display an error message, etc.
    }
  };

  const Ticket_Status_Fot_the_Admin = async (status) => {
    navigate("/userticketstatus");
    const updated_tickets_by_admin = await raisedticket.filter((tickerts) => {
      return tickerts.status == status;
    });
    setupdatedticketStatus(updated_tickets_by_admin);
  };

  const Order_status_for_the_admin = async (orderStatus) => {
    navigate("/userorderstatus");
    console.log(orderStatus);
    const updated_order_status_by_admin = await YourOrder.filter((status) => {
      return status.status == orderStatus;
    });

    console.log(updated_order_status_by_admin);
    setUpdatedOrderStatus(updated_order_status_by_admin);
  };

  console.log(updatedOrderStatus);

  const getCartItemsByEmail = async (email) => {
    console.log("email", email);
    const items = await product.filter((products) => {
      return products.email == email;
    });

    setProductbyEmail(items);

    console.log("items", items);
    return items;
  };

  // Function to handle sorting by price
  const handleSortByPrice = () => {
    alert("ok");
    const sortedProducts = [...myProduct];
    sortedProducts.sort((a, b) => b.price - a.price); // Sort from high to low
    setMyProduct(sortedProducts);
    setSortByPrice("highToLow");
  };

  const handleProductBySortedCategory = () => {
    alert("category");
    const sortedByCategory = [...showCategorywiseProduct];
    sortedByCategory.sort((a, b) => b.price - a.price);
    setShowCategorywiseProduct(sortedByCategory);
    setSortByPrice("highToLow");
  };

  const handleSortByRatingsByCategory = () => {
    alert("ok22");
    const sortedProductsCategoryByRaings = [...showCategorywiseProduct];
    sortedProductsCategoryByRaings.sort((a, b) => b.rating - a.rating);
    setShowCategorywiseProduct(sortedProductsCategoryByRaings);
    setSortByRating("highToLow");
  };
  const handleSortByRatings = () => {
    alert("ok2");
    const sortedProductsByRaings = [...myProduct];
    sortedProductsByRaings.sort((a, b) => b.rating - a.rating);
    setMyProduct(sortedProductsByRaings);
    setSortByRating("highToLow");
  };

  let arr = [];

  const proceed_To_pay = (
    email,
    price,
    category,
    id,
    productname,
    quantity,
    reasonofrejection,
    status,
    actionby,
    imageurl
  ) => {
    navigate("/paymentconfiramtion");
    console.log(
      email,
      price,
      category,
      id,
      productname,
      quantity,
      reasonofrejection,
      status,
      actionby,
      imageurl
    );
    arr.push({
      email: email,
      price: price,
      category: category,
      id: id,
      productname: productname,
      quantity: quantity,
      reasonofrejection: reasonofrejection,
      status: status,
      actionby: actionby,
      imageUrl: imageurl,
    });

    setdeliveryProducts(arr);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "highToLow") {
      handleSortByPrice();
    } else if (selectedOption == "byRating") {
      handleSortByRatings();
    } else {
      // Handle other sorting options (e.g., by rating)
    }
  };

  const handleSortChangeByCategory = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "highToLow") {
      handleProductBySortedCategory();
    } else if (selectedOption == "byRating") {
      handleSortByRatingsByCategory();
    } else {
      // Handle other sorting options (e.g., by rating)
    }
  };
  return (
    <>
      <Projectcontext.Provider
        value={{
          handleSortChange,
          handleSortChangeByCategory,
          handleProductBySortedCategory,
          handleSortByRatings,
          getCartItemsByEmail,
          handleSortByPrice,
          sortByPrice,
          productbyEmail,
          proceed_To_pay,
          deliveryProducts,
          Order_status_for_the_admin,
          updatedOrderStatus,
          handleSignup,
          Ticket_Status_Fot_the_Admin,
          updatedticketStatus,
          handleLogin,
          feedback_from_user,
          reopen_the_ticketBy_user,
          Buy_the_product,
          Add_To_Cart,
          getFeedbacks,
          feedbackGivenByUser,
          setFeedbackGivenByUser,
          raisedticket,
          reducer,
          setRaisedticket,
          deleteRaisedTickethandler,
          Reject_user_orders_By_Admin,
          product,
          getRaisedTicket,
          Cancel_order_handler,
          setProduct,
          deletehandler,
          getProducts,
          addProduct,
          updateProduct,
          deleteProduct,
          confirm_login,
          getAllProduct,
          getIndividualProduct,
          Update_user_orders_ForAdmin,
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
          Give_the_solution_by_admin,
          restrictUser,
          myProduct,
          checkAuthority,
          setMyProduct,
          product_details,
          Reais_ticket_from_here,
          showproductDetails,
          reason_of_cancelThe_order,
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
