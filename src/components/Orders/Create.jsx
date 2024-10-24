import React, { useState, useEffect } from "react";
import axios from "axios";

export default function createOrders(){
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cakeId, setCakeId] = useState("");
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
    fetchCakes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!customerName || !customerAddress || !deliveryDate || !paymentMethod || !cakeId) {
      setError("Semua bidang harus diisi");
      return;
    }

    try {
      const response = await axios.post(
        "https://delivery-cake-api.vercel.app/api/api/orders",
        {
          customer_name: customerName,
          customer_address: customerAddress,
          delivery_date: deliveryDate,
          payment_method: paymentMethod,
          cake_id: cakeId,
        }
      );

      if (response.status === 201) {
        setSuccess("Order berhasil ditambahkan");
        setCustomerName("");
        setCustomerAddress("");
        setDeliveryDate("");
        setPaymentMethod("cash");
        setCakeId("");
      } else {
        setError("Terjadi kesalahan dalam menyimpan order");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat membuat order");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Order</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">
            Nama Pelanggan
          </label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            placeholder="Masukkan Nama Pelanggan"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="customerAddress" className="form-label">
            Alamat Pelanggan
          </label>
          <input
            type="text"
            className="form-control"
            id="customerAddress"
            placeholder="Masukkan Alamat Pelanggan"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deliveryDate" className="form-label">
            Tanggal Pengiriman
          </label>
          <input
            type="date"
            className="form-control"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Metode Pembayaran
          </label>
          <select
            className="form-select"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="cash">Cash</option>
            <option value="cashless">Cashless</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="cakeId" className="form-label">
            Pilih Cake
          </label>
          <select
            className="form-select"
            id="cakeId"
            value={cakeId}
            onChange={(e) => setCakeId(e.target.value)}
            required
          >
            <option value="">Pilih Cake</option>
            {cakesList.map((cake) => (
              <option key={cake.id} value={cake.id}>
                {cake.nama}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}