import React, { useState, useEffect } from "react"; 
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CreateOrders() {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cakeId, setCakeId] = useState("");
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
    fetchCakes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !customerAddress || !deliveryDate || !paymentMethod || !cakeId) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Semua bidang harus diisi!',
      });
      return;
    }

    try {
      const response = await axios.post("https://delivery-cake-api.vercel.app/api/api/orders", {
        customer_name: customerName,
        customer_address: customerAddress,
        delivery_date: deliveryDate,
        payment_method: paymentMethod,
        cake_id: cakeId,
      });

      if (response.status === 201) {
        MySwal.fire(
          'Berhasil!',
          'Order berhasil ditambahkan!',
          'success'
        );
        setCustomerName("");
        setCustomerAddress("");
        setDeliveryDate("");
        setPaymentMethod("cash");
        setCakeId("");
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Order gagal dibuat!',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">Nama Pelanggan</label>
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
          <label htmlFor="customerAddress" className="form-label">Alamat Pelanggan</label>
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
          <label htmlFor="deliveryDate" className="form-label">Tanggal Pengiriman</label>
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
          <label htmlFor="paymentMethod" className="form-label">Metode Pembayaran</label>
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
          <label htmlFor="cakeId" className="form-label">Pilih Cake</label>
          <select
            className="form-select"
            id="cakeId"
            value={cakeId}
            onChange={(e) => setCakeId(e.target.value)}
            required
          >
            <option value="">Pilih Cake</option>
            {cakesList.map((cake) => (
              <option key={cake.id} value={cake.id}>{cake.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}
