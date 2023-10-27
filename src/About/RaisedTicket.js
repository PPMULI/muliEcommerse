import React from "react";
import { useState } from "react";
import Navbar from "../genralComponent/Navbar";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Authentaction/Config";
import Footer from "../genralComponent/Footer";
import MyraisedTicket from "../RaisedTicket/MyraisedTicket";
function RaisedTicket() {
  const [credentials, setCredentials] = useState({
    email: localStorage.getItem("email"),
    fullname: "",
    subject: "",
    concern: "",
  });

  const [raisedTicketId, setRaisedTicketId] = useState("")
  const addData = (newBooks) => {
    return addDoc(bookCollectionRef, newBooks);
  };

  const { email, fullname, subject, concern } = credentials;
  console.log(credentials);
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const bookCollectionRef = collection(db, "RaisedTicket");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newbook = {
      email: localStorage.getItem("email"),
      fullname,
      subject,
      concern,
    };

    console.log(newbook);

    try {
      await addData(newbook);
      alert("Success");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="feedback">
        <h1 className="feedback_heading">Raided a Ticket</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <form class="row g-3 form" onSubmit={handleSubmit}>
                <div class="col-md-4">
                  <label for="validationDefault01" class="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    class="form-control"
                    id="email"
                    name="email"
                    value={localStorage.getItem("email")}
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="validationDefault02" class="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    class="form-control"
                    id="fullname"
                    name="fullname"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label for="validationDefaultUsername" class="form-label">
                    Subjeact
                  </label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="subject"
                      onChange={onChange}
                      name="subject"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Enter Your Concern
                  </label>
                  <textarea
                    class="form-control"
                    onChange={onChange}
                    id="concern"
                    name="concern"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-12">
                  <button class="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RaisedTicket;
