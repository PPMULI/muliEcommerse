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
import { Link } from "react-router-dom";
import ecommerselogo from "../Images/ecommerselogo.jfif";
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
      if (user) {
        setAuthUser(user);
      } else {
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
        toast.success("Your session is log-out", {
          position: "top-center",
          theme: "colored",
        });
        localStorage.clear();
        navigate("/adminlogin");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {/* <nav class="navbar navbar-expand-lg fix_navbar"> */}
      <nav
        class="navbar bg-primary navbar-expand-lg navbar_design"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <a class="navbar-brand navbar-heading" href="#">
            <div className="row">
              <Link class="navbar-brand" to="#">
                <img src={ecommerselogo} className="ecommerselogo" />
              </Link>
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
                <Link
                  class="nav-link"
                  to="/aboutus"
                  role="button"
                  // data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About
                </Link>
              </li>

              <li class="nav-item dropdown">
                <Link
                  class="nav-link"
                  to="/raisedticket"
                  role="button"
                  // data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Raise Ticket
                </Link>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My request
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
                    navigate("/adminlogin");
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
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}

export default Navbar;
