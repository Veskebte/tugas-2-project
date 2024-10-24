import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListOrders(){
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://delivery-cake-api.vercel.app/api/api/orders");
        setOrders(response.data.result);
      } catch (error) {
        setError("Gagal mengambil data orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">List Orders</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nama Pelanggan</th>
            <th>Alamat</th>
            <th>Tanggal Pengiriman</th>
            <th>Metode Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer_name}</td>
              <td>{order.customer_address}</td>
              <td>{order.delivery_date}</td>
              <td>{order.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

