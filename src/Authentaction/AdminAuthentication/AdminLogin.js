import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { auth, provider } from "../Config";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import projectcontext from "../../projectcontext/projectContext";
import Navbar from "../../genralComponent/Navbar";

function AdminLogin() {
  const [values, setValues] = useState("");

  const context = useContext(projectcontext);
  const { timeout, restrictUser, handleLogin } = context;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    restrictUser();
  }, []);
  const { email, password } = formData;

  const navigate = useNavigate();

  const handleClick = (e) => {
    signInWithPopup(auth, provider).then((data) => {
      setValues(data.user.email);
      localStorage.setItem("accesstoken", data.user.accessToken);
      localStorage.setItem("email", data.user.email);
      toast.success("Congratulations! You are logged-in", {
        position: "top-center",
        theme: "colored",
      });

      const goThere = setTimeout(timeout, 3000);

      if (!data.user.accessToken) {
        toast.error("Something Wents Wrong. Please try again", {
          position: "top-center",
          theme: "colored",
        });
      }
      navigate("/");
    });
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
                <h1 className="adminlogin_heading">Login here</h1>
                <hr />
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
                Don't have account?{" "}
                <Link className="link" to="/adminsignup">
                  Signup
                </Link>
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-5">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogin(formData.email, formData.password);
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

      <ToastContainer />
    </>
  );
}

export default AdminLogin;
