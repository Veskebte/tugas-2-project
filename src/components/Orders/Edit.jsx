import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function EditOrders() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({
    customer_name: "",
    customer_address: "",
    delivery_date: "",
    payment_method: "cash",
    cake_id: "",
  });
  const [cakesList, setCakesList] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get("https://delivery-cake-api.vercel.app/api/api/cakes");
        setCakesList(response.data.result);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal mengambil data kue!',
        });
      }
    };

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://delivery-cake-api.vercel.app/api/api/orders/${id}`);
        setOrderData(response.data.result);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi kesalahan saat mengambil data order',
        });
      }
    };

    fetchCakes();
    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://delivery-cake-api.vercel.app/api/api/orders/${id}`,
        orderData
      );

      if (response.status === 200) {
        MySwal.fire(
          'Berhasil!',
          'Order berhasil diperbarui!',
          'success'
        );
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Order gagal diperbarui!',
      });
    }
  };

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Pelanggan</label>
          <input
            type="text"
            name="customer_name"
            className="form-control"
            value={orderData.customer_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Alamat Pelanggan</label>
          <input
            type="text"
            name="customer_address"
            className="form-control"
            value={orderData.customer_address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Pengiriman</label>
          <input
            type="date"
            name="delivery_date"
            className="form-control"
            value={orderData.delivery_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Metode Pembayaran</label>
          <select
            name="payment_method"
            className="form-control"
            value={orderData.payment_method}
            onChange={handleInputChange}
          >
            <option value="cash">Cash</option>
            <option value="cashless">Cashless</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pilih Cake</label>
          <select
            name="cake_id"
            className="form-control"
            value={orderData.cake_id}
            onChange={handleInputChange}
          >
            {cakesList.map((cake) => (
              <option key={cake.id} value={cake.id}>
                {cake.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
