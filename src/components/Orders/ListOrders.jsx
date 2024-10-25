import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    cake_id: "",
    customer_name: "",
    customer_address: "",
    delivery_date: "",
    payment_method: "cash",
  });
  const [cakesList, setCakesList] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({
    id: null,
    status: "pending"
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://delivery-cake-api.vercel.app/api/api/orders");
        setOrders(response.data.result);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi kesalahan saat mengambil data orders',
        });
      }
    };

    const fetchCakes = async () => {
      try {
        const response = await axios.get("https://delivery-cake-api.vercel.app/api/api/cakes");
        setCakesList(response.data.result);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi kesalahan saat mengambil data cakes',
        });
      }
    };

    fetchOrders();
    fetchCakes();
  }, []);

  const handleDelete = async (id) => {
    MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda tidak dapat mengembalikan order ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://delivery-cake-api.vercel.app/api/api/orders/${id}`);
          setOrders(orders.filter((order) => order.id !== id));
          MySwal.fire(
            'Terhapus!',
            'Order berhasil dihapus.',
            'success'
          );
        } catch (error) {
          MySwal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Terjadi kesalahan saat menghapus order',
          });
        }
      }
    });
  };

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://delivery-cake-api.vercel.app/api/api/orders", newOrder);
      if (response.status === 201) {
        MySwal.fire('Berhasil!', 'Order berhasil dibuat!', 'success');
        setOrders([...orders, response.data]);
        setNewOrder({
          cake_id: "",
          customer_name: "",
          customer_address: "",
          delivery_date: "",
          payment_method: "cash",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Order gagal dibuat!',
      });
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.patch(`https://delivery-cake-api.vercel.app/api/api/orders/${orderId}/status`, { status });
      if (response.status === 200) {
        setOrders(orders.map((order) => order.id === orderId ? { ...order, status } : order));
        MySwal.fire('Berhasil!', 'Status order berhasil diperbarui!', 'success');
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Gagal memperbarui status order!',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">List Orders</h2>

      {/* NavLink untuk menambah order baru */}
      <NavLink to="/orders/create" className="btn btn-primary mb-3">
        Tambah Order
      </NavLink>

      {/* Tabel Orders */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Pelanggan</th>
            <th>Alamat Pelanggan</th>
            <th>Tanggal Pengiriman</th>
            <th>Metode Pembayaran</th>
            <th>Cake</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">Tidak ada data order</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{order.customer_address}</td>
                <td>{order.delivery_date}</td>
                <td>{order.payment_method}</td>
                <td>{order.cake.name}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
