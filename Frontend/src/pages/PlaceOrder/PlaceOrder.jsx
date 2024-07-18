import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
    else if (getTotalAmount() == 0) {
      navigate("/cart")
    }
  }, [token]);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((preData) => ({ ...preData, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      // console.log(cartItems[item._id]);
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    console.log(response);
    if (response.data.success) {
      const { session_url } = response.data;
      console.log(session_url);
      window.location.replace(session_url);
    } else {
      console.log("error");
    }

    console.log(orderItems);
  };

  return (
    <div className="place-order-main">
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input
              required
              type="text"
              name="firstname"
              value={data.firstname}
              placeholder="First name"
              onChange={onChangeHandler}
            />
            <input
              required
              type="text"
              name="lastname"
              value={data.lastname}
              placeholder="Last name"
              onChange={onChangeHandler}
            />
          </div>
          <input
            required
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            name="street"
            value={data.street}
            placeholder="street"
            onChange={onChangeHandler}
          />
          <div className="multi-field">
            <input
              required
              type="text"
              onChange={onChangeHandler}
              name="city"
              value={data.city}
              placeholder="City"
            />
            <input
              required
              type="text"
              onChange={onChangeHandler}
              name="state"
              value={data.state}
              placeholder="State"
            />
          </div>
          <div className="multi-field">
            <input
              required
              type="text"
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              placeholder="Zip-Code"
            />
            <input
              required
              type="text"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              placeholder="Country"
            />
          </div>
          <input
            required
            type="text"
            value={data.phone}
            name="phone"
            onChange={onChangeHandler}
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart-Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
