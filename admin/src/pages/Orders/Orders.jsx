import React from "react";
import "./Orders.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

import { toast } from "react-toastify";
const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      console.log(response.data.message);
      console.log(response.data);
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    // console.log(event, orderId);
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {itemIndex !== order.items.length - 1 && ","}
                  </span>
                ))}
              </p>
            </div>
            <p className="order-item-name">
              {order.address.firstname + " " + order.address.lastname}
            </p>
            <div className="order-item-address">
              <p>{order.address.street + ","}</p>
              <p>
                {order.address.city +
                  "," +
                  order.address.state +
                  "," +
                  order.address.country +
                  "," +
                  order.address.zipcode}
              </p>
            </div>
            <p className="order-item-phone">{order.address.phone}</p>
            <p>Items : {order.items.length}</p>
            <p>{order.items.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
