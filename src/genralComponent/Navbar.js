import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "./Global.css";
import { auth } from "../Authentaction/Config";
import { signOut } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import projectcontext from "../projectcontext/projectContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Navbar() {
  const navigate = useNavigate();
  // const [authUser, setAuthUser] = useState(null);
  const context = useContext(projectcontext);
  const {
    product_category,
    showCategorywiseProduct,
    setShowCategorywiseProduct,
  } = context;

  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log("user", user);
        setAuthUser(user);
      } else {
        console.log("user", user);
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log(auth);
        toast.success("Your session is log-out", {
          position: "top-center",
          theme: "colored",
        });
        console.log("sign out successful");
        localStorage.clear();
        navigate("/adminlogin");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg fix_navbar">
        <div class="container-fluid">
          <a class="navbar-brand navbar-heading" href="#">
            <div className="row">
              <a class="navbar-brand muli_store" href="/">
                Muli Store
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav navbar-items">
              <li class="nav-item navbar-links">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link"
                  href="/products"
                  role="button"
                  // data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/aboutus">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/raisedticket">
                      Raised Ticket
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/feedback">
                      Feedback
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/myraisedticket">
                      My Raised Ticket
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/myorder">
                      My Orders
                    </a>
                  </li>
                 
                  <li>
                    <a
                      class="dropdown-item"
                      href="/peoplefeedback"
                    >
                      Feedback from people
                    </a>
                  </li>
                </ul>
              </li>
              {localStorage.getItem("email") ||
              localStorage.getItem("accesstoken") ? (
                <div className="icons_on_nav login_icon" onClick={userSignOut}>
                  <Logout />
                </div>
              ) : (
                <div
                  className="icons_on_nav login_icon"
                  onClick={() => {
                    navigate("/userauthentaction");
                  }}
                >
                  <LoginIcon />
                </div>
              )}

              <div
                className="icons_on_nav cart_icon"
                onClick={() => {
                  navigate("/yourcart");
                }}
              >
                <AddShoppingCartIcon />
              </div>

              <div
                className="icons_on_nav cart_icon"
                onClick={() => {
                  navigate("/yourcart");
                }}
              >
                <FavoriteIcon />
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}

export default Navbar;
