import React, { useContext, useState } from "react";
import projectcontext from "../../projectcontext/projectContext";
import Navbar from "../../genralComponent/Navbar";

function Givefeedback() {
  const context = useContext(projectcontext);
  const { feedback_from_user } = context;
  const [credentials, setCredentials] = useState({
    customerserviceID: localStorage.getItem("feedbackformID"),
    email: localStorage.getItem("email"),
    name: "",
    feedbackreletedto: "orderedproduct",
    leavetherating: "excellent",
    moreaboutservice: "",
  });

  const {
    name,
    feedbackreletedto,
    leavetherating,
    moreaboutservice,
  } = credentials;
 
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
    <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div class="fb-form">
              <form action="#" class="form-group feedback_form">
                <h2>Tell us what you think</h2>
                <input
                  class="form-control feedback_form_input"
                  value={localStorage.getItem("feedbackformID")}
                  name="customerserviceID"
                  id="customerserviceID"
                  disabled
                  type="text"
                />
                <input
                  class="form-control feedback_form_input"
                  placeholder="Email"
                  name="email"
                  value={localStorage.getItem("email")}
                  disabled
                  id="email"
                  type="text"
                />
                <input
                  class="form-control feedback_form_input"
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={onChange}
                  id="name"
                />

                <select
                  class="form-select feedback_form_input"
                  onChange={onChange}
                  name="feedbackreletedto"
                  id="feedbackreletedto"
                  aria-label="Default select example"
                >
                  <option selected value="orderedproduct">
                    Ordered Product
                  </option>
                  <option value="raisedticket">Raised Ticket</option>
                </select>

                <select
                  class="form-select feedback_form_input"
                  name="leavetherating"
                  onChange={onChange}
                  id="leavetherating"
                  aria-label="Default select example"
                >
                  <option value="bad">
                    1- Bad
                  </option>
                  <option value="average">
                    2-average
                  </option>
                  <option value="good">
                    3- Good
                  </option>
                  <option value="better">
                    4- Better
                  </option>
                  <option selected value="excellent">
                    5- Excellent
                  </option>
                </select>
                <textarea
                  class="form-control feedback_form_input"
                  id="fb-comment moreaboutservice"
                  name="moreaboutservice"
                  onChange={onChange}
                  placeholder="Tell us what you think"
                ></textarea>
                <button
                  class="form-control btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    feedback_from_user(
                      localStorage.getItem("feedbackformID"),
                      localStorage.getItem("email"),
                      credentials.name,
                      credentials.feedbackreletedto,
                      credentials.leavetherating,
                      credentials.moreaboutservice
                    );
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Givefeedback;
