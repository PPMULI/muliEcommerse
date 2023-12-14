import React, { useContext } from "react";
import projectcontext from "../projectcontext/projectContext";

function Categorybuttons() {
  const context = useContext(projectcontext);
  const {
    product_category,
    showCategorywiseProduct,
    setShowCategorywiseProduct,
  } = context;

   return (
    <>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-7">
          <div className="filter_section">
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("laptops");
              }}
            >
              Laptop
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("smartphones");
              }}
            >
              Smartphones
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("fragrances");
              }}
            >
              Fragrances
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("skincare");
              }}
            >
              Skincare
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("groceries");
              }}
            >
              Groceries
            </button>
            <button
              type="button"
              class="btn btn-success filter_section_buttons"
              onClick={() => {
                product_category("home-decoration");
              }}
            >
              Home-decoration
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categorybuttons;
