import React from "react";

function Dummy() {
  const handle = async () => {
    let btn = document.querySelector(".button");
    console.log(btn);
    let spinnerIcon = document.querySelector(".spinner");
    let btnTxt = document.querySelector(".btn-text");

    btn.classList.add("checked");
    spinnerIcon.classList.add("spin");
    btnTxt.textContent = "loading";

    setTimeout(() => {
      spinnerIcon.classList.replace("spinner", "check");
      spinnerIcon.classList.replace("fa-spinner", "fa-check");
      btnTxt.textContent = "done";
    }, 5000);
  };
  
  return (
    <>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 payment_details">
              <h3>Enter your payment details</h3>
              <div class="mb-3">
                <input
                  type="email"
                  placeholder="Card number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="street address"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div class="mb-3">
                <select class="form-select" aria-label="Default select example">
                  <option selected>India</option>
                  <option value="US">United State</option>
                </select>
              </div>

              <div className="row CVV">
                <div className="col-lg-6">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="col-lg-6">
                  <input
                    type="text"
                    placeholder="CVV"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
            <div className="col-lg-4 col-md-5 col-sm-12 col-12 order_details">
              <h5>Orders Details</h5>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  handle();
                }}
              >
                  <i class="fa fa-spinner icon spinner" aria-hidden="true"></i>
                  <span className="btn-text">Confirm Order</span>
               </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dummy;

/* Add this CSS to your component's stylesheet or import it */
