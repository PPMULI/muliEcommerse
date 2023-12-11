import React, { useState, useEffect, useContext } from "react";
import Navbar from "../genralComponent/Navbar";
import projectcontext from "../projectcontext/projectContext";
import Footer from "../genralComponent/Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function MyraisedTicket() {
  const context = useContext(projectcontext);
  const [fetchyourraisedticketbyEmail, setfetchyourRaisedTicketbyEmail] =
    useState([]);

  const [credentials, setCredentials] = useState({ subject: "", concern: "" });
  const { concern, subject } = credentials;
  const {
    getRaisedTicket,
    updateSubjectOfRaisedTicketByUser,
    raisedticket,
    setRaisedticket,
    deleteRaisedTickethandler,
  } = context;
  useEffect(() => {
    getRaisedTicket();
  }, []);

  console.log(raisedticket);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

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

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="mb-3">
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
                  <button
                    class="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      updateSubjectOfRaisedTicketByUser(
                        localStorage.getItem("TicketID"),
                        credentials.subject,
                        credentials.concern
                      );
                    }}
                  >
                    Update Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="myraisedticket">
        <h1 className="myraisedticket_heading">My Raised Tickets</h1>
        <button
          onClick={() => {
            getRaisedTicketByEmail(localStorage.getItem("email"));
          }}
        >
          Get Your tickets
        </button>

        <h1 className="your_cart_heading">Your Orders</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              {fetchyourraisedticketbyEmail &&
                fetchyourraisedticketbyEmail.map((value) => {
                  console.log(value);
                  return (
                    <>
                      <div className="col-lg-12">
                        <div class="card cart_items">
                          <div class="card-body">
                            <div className="row">
                              <div className="col-lg-6">
                                <p className="user_email">{value.email}</p>
                              </div>

                              <div className="col-lg-6">
                                <p className="order_status">{value.id}</p>
                              </div>

                              <div className="col-lg-6">
                                Ticket Details:
                                <ul>
                                  <li>Full name: {value.name}</li>
                                  <li>Subject: {value.subject}</li>
                                  <li>
                                    Concern: {value.concern}
                                  </li>
                                </ul>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-lg-6"></div>

                                <div className="col-lg-6">
                                  <div className="row">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <EditIcon
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={(e) => {
                                              localStorage.setItem(
                                                "TicketID",
                                                value.id
                                              );
                                            }}
                                          />
                                        </div>

                                        <div className="col-lg-6">
                                          <DeleteForeverIcon
                                            onClick={(e) => {
                                              e.preventDefault();
                                              deleteRaisedTickethandler(
                                                value.id
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyraisedTicket;
