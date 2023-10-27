import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import projectcontext from "../projectcontext/projectContext";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Dummy() {
  // const [formData, setFormData] = useState({ email: "",lastname: "" });

  // const { email, pic } = formData;
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("ok");
  // };
  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const [details, setDetails] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  const PostData = async (e) => {
    e.preventDefault();

    const { fName, lName, email } = details;

    alert("formdata")

    const res = await fetch(
      "https://muli-e-commerse-default-rtdb.firebaseio.com/mulicommerse.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName,
          lName,
          email,
        }),
      }
    );

    const result = res.json()
    console.log(result)
    console.log(res)
  };

  return (
    <>
      {/* <Navbar />
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
            Pic
          </label>

          <input
            type="text"
            className="form-control admininput"
            id="lastname"
            name="lastname"
            // value=
            onChange={(e) => setCoverpic(e.target.files[0])}
            placeholder="Enter password"
          />
          <hr />
        </div>

        {/* <div className="row"> */}
      {/* <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <button
            type="submit"
            onClick={handleLogin}
            className="btn btn-outline-primary adminlogin_btn"
          >
            Login
          </button>
        </div>
        {/* </div> */}
      {/* </div> */}
      {/* <hr /> */}

      {/* </form>  */}

      <div className="form">
        <input
          type="text"
          placeholder="Enter your first name"
          onChange={(e) => setDetails({ ...details, fName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter your last name"
          onChange={(e) => setDetails({ ...details, lName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter your Email address"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        <button onClick={PostData}>Submit</button>
      </div>
      {/* ) */}
      {/* } */}
    </>
  );
}

export default Dummy;
