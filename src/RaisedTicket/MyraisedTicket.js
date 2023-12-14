import React, { useState, useEffect, useContext } from "react";
import Navbar from "../genralComponent/Navbar";
import projectcontext from "../projectcontext/projectContext";
import Footer from "../genralComponent/Footer";
import pending from "../Images/pending.jfif";
import resolve from "../Images/resolve.jfif";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function MyraisedTicket() {
  const context = useContext(projectcontext);
  const [fetchyourraisedticketbyEmail, setfetchyourRaisedTicketbyEmail] =
    useState([]);

  const [credentials, setCredentials] = useState({ subject: "", concern: "" });
  const [reopenTickeCredentials, setReopenTicketCredentials] = useState({
    detailaquery: "",
    detailmessage: "",
  });
  const { concern, subject } = credentials;
  const { detailaquery, detailmessage } = reopenTickeCredentials;
  const {
    getRaisedTicket,
    updateSubjectOfRaisedTicketByUser,
    raisedticket,
    setRaisedticket,
    reopen_the_ticketBy_user,
    deleteRaisedTickethandler,
  } = context;
  useEffect(() => {
    getRaisedTicket();
  }, []);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onHandleChange = (e) => {
    setReopenTicketCredentials({
      ...reopenTickeCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const getRaisedTicketByEmail = async (email) => {
    const items = await raisedticket.filter((products) => {
      return products.email == email;
    });

    setfetchyourRaisedTicketbyEmail(items);
    return items;
  };

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
              <h1 class="modal-title fs-5 carefully" id="exampleModalLabel">
                Please fille the form carefully
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
                        localStorage.getItem("ticketsID"),
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

      {/* re-open the ticket */}
      <div
        class="modal fade"
        id="reopenticket"
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
                    Enter your Quary
                  </label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="detailaquery"
                      onChange={onHandleChange}
                      name="detailaquery"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Enter Your Message
                  </label>
                  <textarea
                    class="form-control"
                    onChange={onHandleChange}
                    id="detailmessage"
                    name="detailmessage"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-12">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      reopen_the_ticketBy_user(
                        localStorage.getItem("reOpenTicketID"),
                        "pending",
                        reopenTickeCredentials.detailaquery,
                        reopenTickeCredentials.detailmessage
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
      <div className="your_cart">
        <h4 className="user_orders">User Orders</h4>
        <div className="container">
          <button
            onClick={() => {
              getRaisedTicketByEmail(localStorage.getItem("email"));
            }}
          >
            Refresh
          </button>
          <div className="row">
            {fetchyourraisedticketbyEmail &&
              fetchyourraisedticketbyEmail.map((value) => {
                return (
                  <>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10">
                      <div class="card total_user_order">
                        <div className="row">
                          <div className="col-lg-6">
                            <p className="user_email">{value.email}</p>
                          </div>

                          <div className="col-lg-6">
                            <p className="order_id">Order ID: {value.id}</p>
                          </div>

                          {value.status == "resolve" ? (
                            <div className="col-lg-2">
                              <img
                                src={resolve}
                                class="card-img-top raised_ticket_image"
                                alt="..."
                              />
                            </div>
                          ) : (
                            <div className="col-lg-2">
                              <img
                                src={pending}
                                class="card-img-top raised_ticket_image"
                                alt="..."
                              />
                            </div>
                          )}

                          <div className="col-lg-5">
                            <div class="card-body">
                              <h5 class="card-title">Ticket Details</h5>
                              <p class="card-text">
                                <ul>
                                  <li>Name: {value.name}</li>
                                  <li>Subject: {value.concern}</li>
                                  <li>Message: {value.subject}</li>
                                </ul>
                              </p>
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <ul className="product_status">
                              <li>Status: </li>
                              <li>{value.status}</li>
                            </ul>
                          </div>
                          {value.status != "resolve" ? (
                            <div className="col-lg-3">
                              <button
                                className="btn btn-outline-danger resolve_button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteRaisedTickethandler(value.id);
                                }}
                              >
                                Revert
                              </button>

                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="btn btn-outline-warning resolve_button resolve_button_user "
                                onClick={() => {
                                  localStorage.setItem("ticketsID", value.id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            <div
                              className="action_buttons"
                              id="action_button d-none"
                            >
                              <hr />
                              <div className="row">
                                <div className="col-lg-6">
                                  <h6 className="reason">
                                    Reason: {value.reasonofissue}
                                  </h6>
                                  <h6 className="solution">
                                    Solution: {value.solution}
                                  </h6>
                                </div>

                                <div className="col-lg-6">
                                  <h6 className="user_email">
                                    Resolve By: {value.actionby}
                                  </h6>
                                </div>

                                <div className="col-lg-6">
                                  <button
                                    className="btn btn-warning"
                                    data-bs-toggle="modal"
                                    data-bs-target="#reopenticket"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      localStorage.setItem(
                                        "reOpenTicketID",
                                        value.id
                                      );
                                    }}
                                  >
                                    Not satisfied
                                  </button>
                                </div>
                                <div className="col-lg-6">
                                  <p className="satisfied">
                                    Are You Satisfied?{" "}
                                    <a
                                      href="/givefeedback"
                                      onClick={() => {
                                        localStorage.setItem(
                                          "feedbackformID",
                                          value.id
                                        );
                                      }}
                                    >
                                      Give feedback
                                    </a>{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-lg-1"></div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyraisedTicket;
