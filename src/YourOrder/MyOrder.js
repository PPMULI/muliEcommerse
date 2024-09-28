import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import emptybasket from "../Images/empty-basket.png";
import projectcontext from "../projectcontext/projectContext";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

function MyOrder() {
  const context = useContext(projectcontext);
  const {
    UserOrder_by_user_details,
    YourOrder,
    setYourOrder,
    Cancel_order_handler,
    confirm_login,
    // getCartItemsByEmail,
    getProductsThat_You_Buy,
  } = context;

  useEffect(() => {
    getProductsThat_You_Buy();
  }, []);

  useEffect(() => {
    user_orders(localStorage.getItem("email"));
  }, []);
  console.log(YourOrder);
  const [userOrder, setUserOrder] = useState([]);
  const user_orders = async (email) => {
    const orders = await YourOrder.filter((order) => {
      return order.email == email;
    });
    setUserOrder(orders);
    console.log(orders);
  };

  console.log(userOrder);
  return (
    <>
      <div className="new_myOrder_background">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-2 my_order_filter_section">
              <strong className="myorder_filter">Filters</strong> <hr />
              <p className="order_status"> Order Status </p>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Pending
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck2"
                />
                <label class="form-check-label" for="defaultCheck2">
                  Delived
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck3"
                />
                <label class="form-check-label" for="defaultCheck3">
                  Cancelled
                </label>
              </div>{" "}
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck4"
                />
                <label class="form-check-label" for="defaultCheck4">
                  Returned
                </label>
              </div>
              <hr />
            </div>
            <div className="col-lg-10">
              <form class="d-flex" role="search">
                <input
                  class="form-control search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="search_button" type="submit">
                  <SearchIcon />
                  Search
                </button>
              </form>
              {userOrder.length == 0 ? (
                <div className="empty-basket-image">
                  <img src={emptybasket} className="empty-baset-image" alt="" />
                  <p>Your Basket is empty</p>

                  <div className="cart_buttons">
                    <button className="shop_now">Shop Now</button>
                    <button
                      className="refesh_button"
                      onClick={() => {
                        user_orders(localStorage.getItem("email"));
                      }}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              ) : (
                userOrder.map((value) => {
                  return (
                    <>
                      <div className="your_order_details mt-2">
                        {value.your_product.map((val) => {
                          console.log(val);
                          return (
                            <>
                              <div className="your_orders">
                                <div>
                                  <img
                                    src={val.imageurl}
                                    alt=""
                                    className="your_orders_image"
                                  />
                                </div>

                                <div>{val.productcategory} <br /> {val.productname}</div>

                                <div>
                                {val.price}
                                </div>

                                <div>
                                  <p id="my_order_status"> <span className="my_order_status">djb</span> {value.status}</p> <p>Your order is pending</p>
                                </div>
                              </div>
                              <hr />
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default MyOrder;
