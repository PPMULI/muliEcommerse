import React, { useState, useEffect, useContext } from "react";
import Navbar from "../genralComponent/Navbar";
import projectcontext from "../projectcontext/projectContext";
import Footer from "../genralComponent/Footer";

function MyraisedTicket() {
  const context = useContext(projectcontext);
  const [fetchyourraisedticketbyEmail, setfetchyourRaisedTicketbyEmail] =
    useState([]);
  const {
    getRaisedTicket,
    raisedticket,
    setRaisedticket,
    deleteRaisedTickethandler,
  } = context;
  useEffect(() => {
    getRaisedTicket();
  }, []);

  console.log(raisedticket);

  const getRaisedTicketByEmail = async (email) => {
    console.log(email);
    // console.log(product);
    const items = await raisedticket.filter((products) => {
      return products.email == email;
    });

    setfetchyourRaisedTicketbyEmail(items);
    console.log(items);
    return items;
  };

  console.log(fetchyourraisedticketbyEmail);
  return (
    <>
      <Navbar />
      <div className="myraisedticket">
        <h1 className="myraisedticket_heading">My Raised Tickets</h1>
        <button
          onClick={() => {
            getRaisedTicketByEmail(localStorage.getItem("email"));
          }}
        >
          Get Your tickets
        </button>

        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              {fetchyourraisedticketbyEmail &&
                fetchyourraisedticketbyEmail.map((value) => {
                  console.log(value);
                  return (
                    <div class="card raisedtickets">
                      <div class="card-body">
                        <div className="row">
                          <div className="col-lg-6">
                            <p className="user_email">Email: {value.email} </p>
                          </div>
                          <div className="col-lg-3">
                            <button
                              type="button"
                              class="btn btn-warning"
                              // onClick={(e) => {
                              //   getBookId(value.id);
                              // }}
                            >
                              Update ticket
                            </button>
                          </div>
                          <div className="col-lg-3">
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={(e) => {
                                deleteRaisedTickethandler(value.id);
                              }}
                            >
                              Delete ticket
                            </button>
                          </div>
                        </div>
                      </div>
                      <h4> Subject: {value.subject}</h4>
                      <h6> Details: {value.concern}</h6>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyraisedTicket;
