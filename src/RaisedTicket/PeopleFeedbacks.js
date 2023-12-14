import React, { useContext, useEffect } from "react";
import Navbar from "../genralComponent/Navbar";
import projectcontext from "../projectcontext/projectContext";

function PeopleFeedbacks() {
  const context = useContext(projectcontext);
  const { getFeedbacks, feedbackGivenByUser, setFeedbackGivenByUser } = context;

  useEffect(() => {
    getFeedbacks();
  }, []);
  return (
    <>
      <Navbar />
      <div className="PeopleFeedbacks">
        <h1 className="your_valuable_feedback">Your Valuable Feedback</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              {feedbackGivenByUser &&
                feedbackGivenByUser.map((value) => {
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
                                <p className="order_status">{value.fullname}</p>
                              </div>
                            </div>
                            <h5 class="card-title">{value.productname}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">
                              {" "}
                              {value.subject}
                            </h6>
                            <p>{value.feedback}</p>
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
    </>
  );
}

export default PeopleFeedbacks;
