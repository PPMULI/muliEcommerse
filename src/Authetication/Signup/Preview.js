import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import projectcontext from "../../projectcontext/projectContext";

function Preview() {
  const context = useContext(projectcontext);
  const {
    usercredentials,
    validateNewUser,
    onChange,
    country,
    countrname,
    imageUpload,
    setImageUpload,
    resumeupload,
    setresumeUpload,
    aadharupload,
    setAadharupload,
    errorInregestration,
  } = context;
 
  console.log(usercredentials)
   return (
    <>
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
                Edit details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div
                  className={`mb-3 ${
                    errorInregestration.contactnumber ? "has-error" : ""
                  }`}
                >
                  {" "}
                  <label for="exampleInputEmail1" class="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    class="form-control input-filed"
                    id="email"
                    onChange={onChange}
                    value={usercredentials.email}
                    name="email"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div
                  className={`mb-3 ${
                    errorInregestration.contactnumber ? "has-error" : ""
                  }`}
                >
                  {" "}
                  <label for="exampleInputEmail1" class="form-label">
                    full name
                  </label>
                  <input
                    type="text"
                    class="form-control input-filed"
                    id="fullname"
                    onChange={onChange}
                    value={usercredentials.fullname}
                    name="fullname"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div
                  className={`mb-3 ${
                    errorInregestration.contactnumber ? "has-error" : ""
                  }`}
                >
                  {" "}
                  <label for="exampleInputEmail1" class="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    class="form-control input-filed"
                    id="contactnumber"
                    onChange={onChange}
                    value={usercredentials.contactnumber}
                    name="contactnumber"
                    aria-describedby="emailHelp"
                  />
                </div>
                {errorInregestration.contactnumber && (
                  <small className="text-danger">
                    contact number is required
                  </small>
                )}

                <div className="row">
                  <div className="col-lg-6">
                    <div
                      className={`mb-3 ${
                        errorInregestration.dateofbirth ? "has-error" : ""
                      }`}
                    >
                      {/* <div className="mb-3"> */}{" "}
                      <label for="exampleInputEmail1" class="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        class="form-control input-filed"
                        value={usercredentials.dateofbirth}
                        id="dateofbirth"
                        onChange={onChange}
                        name="dateofbirth"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    {errorInregestration.dateofbirth && (
                      <small className="text-danger">
                        Date of bi is required
                      </small>
                    )}
                  </div>

                  <div className="col-lg-6">
                    <div
                      className={`mb-3 ${
                        errorInregestration.dateofbirth ? "has-error" : ""
                      }`}
                    >
                      {" "}
                      <label for="exampleInputEmail1" class="form-label">
                        Nationality
                      </label>
                      <select
                        class="form-select input-filed"
                        name="nationality"
                        onChange={onChange}
                        value={usercredentials.nationality}
                        id="nationality"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select menu</option>

                        {countrname.map((value, index) => {
                          return (
                            <>
                              <option value={value} key={index} defaultValue="india">
                                {value}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Civil Status
                      </label>
                      <select
                        class="form-select input-filed"
                        onChange={onChange}
                        name="employedstatus"
                        value={usercredentials.employedstatus}
                        id="employedstatus"
                        aria-label="Default select example"
                      >
                        <option value="unemployeed" selected>
                          Un-employeed
                        </option>
                        <option value="employeed">Employeed</option>
                      </select>
                    </div>
                  </div>

               <div className="col-lg-6">
               <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Applying as a admin
                  </label>
                  <input
                    type="text"
                    value={usercredentials.applyasadmin}
                    class="form-control preview-input-filled"
                    id="applyingasacourseowner"
                    name="applyingasacourseowner"
                    aria-describedby="emailHelp"
                  />
                </div>
               </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Upload Profile Photo
                      </label>
                      <input
                        type="file"
                        class="form-control input-filed"
                        name="profilephoto"
                        id="profilephoto"
                        onChange={(e) => {
                          setImageUpload(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Upload Aadhar Card
                      </label>
                      <input
                        type="file"
                        class="form-control input-filed"
                        name="aadharcard"
                        id="aadharcard"
                        onChange={(e) => {
                          setAadharupload(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <button
                class="btn user-registartion-button check_out"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>{" "}
          <div className="col-lg-8 preview_your_details">
            <form>
              <div
                className="preview-edit-icon"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <EditIcon /> Edit
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className={`mb-3 ${
                      errorInregestration.email ? "has-error" : ""
                    }`}
                  >
                    <label for="exampleInputEmail1" class="form-label">
                      email
                    </label>
                    <input
                      type="text"
                      class="form-control preview-input-filled"
                      id="email"
                      value={usercredentials.email}
                      disabled
                      name="email"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  {errorInregestration.email && (
                    <small className="text-danger">email is required</small>
                  )}
                </div>

                <div className="col-lg-6">
                  <div
                    className={`mb-3 ${
                      errorInregestration.fullname ? "has-error" : ""
                    }`}
                  >
                    {" "}
                    <label for="exampleInputEmail1" class="form-label">
                      Full name
                    </label>
                    <input
                      type="text"
                      class="form-control preview-input-filled"
                      id="fullname"
                      disabled
                      name="fullname"
                      value={usercredentials.fullname}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  {errorInregestration.fullname && (
                    <small className="text-danger">Full name is required</small>
                  )}
                </div>
              </div>
              <div
                className={`mb-3 ${
                  errorInregestration.contactnumber ? "has-error" : ""
                }`}
              >
                {" "}
                <label for="exampleInputEmail1" class="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  disabled
                  class="form-control preview-input-filled"
                  id="contactnumber"
                  value={usercredentials.contactnumber}
                  name="contactnumber"
                  aria-describedby="emailHelp"
                />
              </div>
              {errorInregestration.contactnumber && (
                <small className="text-danger">
                  Contact number is required
                </small>
              )}

              <div className="row">
                <div className="col-lg-6">
                  <div
                    className={`mb-3 ${
                      errorInregestration.dateofbirth ? "has-error" : ""
                    }`}
                  >
                    {" "}
                    {/* <div className="mb-3"> */}{" "}
                    <label for="exampleInputEmail1" class="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      value={usercredentials.dateofbirth}
                      disabled
                      class="form-control preview-input-filled"
                      id="dateofbirth"
                      name="dateofbirth"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  {errorInregestration.dateofbirth && (
                    <small className="text-danger">
                      Date of birth is required
                    </small>
                  )}
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    {" "}
                    <label for="exampleInputEmail1" class="form-label">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={usercredentials.nationality}
                      disabled
                      class="form-control preview-input-filled"
                      id="dateofbirth"
                      name="dateofbirth"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Civil Status
                    </label>
                    <input
                      type="text"
                      value={usercredentials.employedstatus}
                      disabled
                      class="form-control preview-input-filled"
                      id="dateofbirth"
                      name="dateofbirth"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>

        

                <div className="col-lg-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Applying as a admin
                    </label>
                    <input
                      type="text"
                      value={usercredentials.applyasadmin}
                      disabled
                      class="form-control preview-input-filled"
                      id="dateofbirth"
                      name="dateofbirth"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>
           
              <div className="row">
                <div className="col-lg-6">
                  <div
                    className={`mb-3 ${
                      errorInregestration.imageUpload ? "has-error" : ""
                    }`}
                  >
                    {" "}
                    <label for="exampleInputPassword1" class="form-label">
                      Upload Profile Photo
                    </label>
                    <input
                      type="text"
                       disabled
                      class="form-control preview-input-filled"
                      name="profilephoto"
                      id="profilephoto"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className={`mb-3 ${
                      errorInregestration.aadharupload ? "has-error" : ""
                    }`}
                  >
                    {" "}
                    <label for="exampleInputPassword1" class="form-label">
                      Upload Aadhar Card
                    </label>
                    <input
                      type="text"
                      disabled
                      class="form-control preview-input-filled"
                      name="aadharcard"
                      id="aadharcard"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  validateNewUser(
                    usercredentials.fullname,
                    usercredentials.email,
                    usercredentials.password,
                    usercredentials.cpassword,
                    usercredentials.dateofbirth,
                    usercredentials.contactnumber,
                    usercredentials.nationality,
                    usercredentials.employedstatus,
                    usercredentials.applyasadmin,
                    aadharupload,
                    imageUpload,
                  );
                }}
                class="btn user-registartion-button check_out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
