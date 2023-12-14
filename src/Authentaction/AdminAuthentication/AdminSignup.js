import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { auth, provider } from "../Config";
import { signInWithPopup } from "firebase/auth";
import Navbar from "../../genralComponent/Navbar";
import projectcontext from "../../projectcontext/projectContext";

function AdminSignup() {
  const [values, setValues] = useState("");
  const context = useContext(projectcontext);
  const { handleSignup } = context;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { email, password } = credentials;
  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
                  <div className="col-lg-3"></div>
                  <div className="col-lg-5">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSignup(credentials.email, credentials.password);
                      }}
                      className="btn btn-outline-primary adminlogin_btn"
                    >
                      <LockOpenIcon /> Login
                    </button>
                  </div>
                </div>
                <hr />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    //  </>
  );
}

export default AdminSignup;
