import React from 'react'
import bggirl from "../Images/homegirl.png";
import { useNavigate } from 'react-router-dom';

function Bghome() {
    const navigate = useNavigate()
  return (
    <div>
       <div>
      <div class="card homecard">
        <div className="content">
          <div className="col-lg-6">
            <p class="card-text offfer">
              <h1>Get up to 30% off</h1>
              <h1>New Arrivals</h1>
            <button className="btn btn-primary mt-3" onClick={() => {
                navigate("/products")
            }}>Shop Now</button>
            </p>
          </div>
          <div className="col-lg-6">
            <img src={bggirl} class="card-img-top bggirl" alt="..." />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Bghome
