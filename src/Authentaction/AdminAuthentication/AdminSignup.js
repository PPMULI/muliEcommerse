import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { auth, provider } from "../Config";
import { signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from "../../genralComponent/Navbar";

function AdminSignup() {
  const [values, setValues] = useState("");

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { email, password } = credentials;

  const handleSignup = (e) => {
    e.preventDefault();
    alert("ok");
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredentials) => {
        alert("ok 12");
        console.log(userCredentials);
      })
      .catch((error) => {
        alert("not ok");
        console.log(error);
      });
  };

  const handleClick = (e) => {
    // e.preventDefault();
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
      setValues(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  return (
    <>
    <Navbar />
      <div className="adminBackgroumnd">
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-5">
              <form className="adminlogin">
                <h1 className="adminlogin_heading">Signup Here</h1>
                <hr />{" "}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control admininput"
                    id="email"
                    name="email"
                    onChange={onChange}
                    placeholder="Enter email"
                    aria-describedby="emailHelp"
                  />
                  <hr />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control admininput"
                    id="password"
                    name="password"
                    onChange={onChange}
                    placeholder="Enter password"
                  />
                  <hr />
                </div>
                Already have account?{" "}
                <Link className="link" to="/adminlogin">
                  Login
                </Link>
                <div className="row">
                  <div className="col-lg-1"></div>
                  <div className="col-lg-5">
                    <button
                      type="submit"
                      onClick={handleSignup}
                      className="btn btn-outline-primary adminlogin_btn"
                    >
                      <LockOpenIcon /> Login
                    </button>
                  </div>

                  <div className="col-lg-1"></div>

                  <div className="col-lg-5">
                    <button
                      type="submit"
                      onClick={() => {
                        handleClick();
                      }}
                      className="btn btn-outline-success adminlogin_btn"
                    >
                      <GoogleIcon /> Login with google
                    </button>
                  </div>
                </div>
                <hr />
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          handleClick();
        }}
      >
        hello
      </button>
    </>
    //  </>
  );
}

export default AdminSignup;
