import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditOrders () {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({
    customer_name: "",
    customer_address: "",
    delivery_date: "",
    payment_method: "cash",
    cake_id: "",
  });
  const [cakesList, setCakesList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get("https://delivery-cake-api.vercel.app/api/api/orders");
        setCakesList(response.data.result);
      } catch (error) {
        console.error("Failed to fetch cakes", error);
      }
    };

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://delivery-cake-api.vercel.app/api/api/orders/${id}`);
        setOrderData(response.data.result);
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data order");
      }
    };

    fetchCakes();
    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `https://delivery-cake-api.vercel.app/api/api/orders/${id}`,
        orderData
      );

      if (response.status === 200) {
        setSuccess("Order berhasil diperbarui");
      } else {
        setError("Terjadi kesalahan dalam memperbarui order");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui order");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Order</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
}