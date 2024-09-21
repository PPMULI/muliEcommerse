import React, { useContext } from "react";
import logo from "../Images/apnaLogo.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import projectcontext from "../projectcontext/projectContext";
function Navbar() {
  const navigate = useNavigate();
  const context = useContext(projectcontext);
  const { userSignOut, product } = context;
  return (
    <>
      <nav
        class="navbar navbar_sticky navbar-expand-lg bg-dark mb-3 border-body"
        data-bs-theme="dark"
      >
        {/* <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3"> */}
        <div class="container-fluid navbar_cred">
          <img
            src={logo}
            alt="Logo"
            width="30"
            onClick={() => {
              navigate("/");
            }}
            height="24"
            class="d-inline-block align-text-top"
          />
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
<<<<<<< HEAD
          <div
            class="collapse navbar-collapse navbar_items"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
=======
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav navbar-items">
              <li class="nav-item navbar-links">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>

                <Link href="/adminhome" />
              </li>

              <li class="nav-item dropdown">
>>>>>>> 2826a80f6addf8b887ccab8c876beaed72617ab3
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    navigate("/productcategory");
                  }}
                >
                  Product
                </a>
              </li>
            </ul>
            <AddShoppingCartIcon
              className="shopping_cart_icon"
              onClick={() => {
                navigate("/addtocart");
              }}
            />{" "}
            <span></span>
            {localStorage.getItem("email") ? (
              <>
                <div class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <AccountCircleIcon /> {localStorage.getItem("email")}
                  </a>
                  <div class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        <BookmarkBorderIcon /> User Order
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {navigate("/myprofile")}}>
                        <ContactPageIcon /> Profile
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {userSignOut()}}>
                        <LockOpenIcon /> Logout
                      </a>
                    </li>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-secondary login_button"
                  onClick={() => {
                    navigate("/userlogin");
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
