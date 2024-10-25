import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { NavLink } from "react-router-dom";

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
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false,
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
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }

        MySwal.fire({
            title: "Konfirmasi Tambah Order",
            text: "Apakah Anda yakin ingin menambahkan order ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Tambah!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post("https://delivery-cake-api.vercel.app/api/api/orders", {
                        customer_name: customerName,
                        customer_address: customerAddress,
                        delivery_date: deliveryDate,
                        payment_method: paymentMethod,
                        cake_id: cakeId,
                    });

                    if (response.status === 201) {
                        MySwal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Order berhasil ditambahkan!",
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            showConfirmButton: false,
                        });
                        setCustomerName("");
                        setCustomerAddress("");
                        setDeliveryDate("");
                        setPaymentMethod("cash");
                        setCakeId("");
                    }
                } catch (error) {
                    MySwal.fire({
                        icon: "error",
                        title: "Gagal",
                        text: "Order gagal dibuat!",
                        toast: true,
                        position: "top-end",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Order</h2>

            <NavLink to="/orders" className="btn btn-secondary mb-3">
                Kembali ke List Orders
            </NavLink>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">Nama Pelanggan</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="customerAddress" className="form-label">Alamat Pelanggan</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerAddress"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
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
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentMethod" className="form-label">Metode Pembayaran</label>
                    <select
                        className="form-select"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="cash">Cash</option>
                        <option value="cashless">Cashless</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="cakeId" className="form-label">Kue</label>
                    <select
                        className="form-select"
                        id="cakeId"
                        value={cakeId}
                        onChange={(e) => setCakeId(e.target.value)}
                    >
                        <option value="">Pilih Kue</option>
                        {cakesList.map((cake) => (
                            <option key={cake.id} value={cake.id}>
                                {cake.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Tambah Order</button>
            </form>
        </div>
    );
}
