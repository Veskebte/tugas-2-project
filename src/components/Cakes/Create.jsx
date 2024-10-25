import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { NavLink } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function CreateCakes() {
    const [namaCakes, setNamaCakes] = useState("");
    const [flavor, setFlavor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!namaCakes || !flavor || !size || !price) {
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: "Semua kolom harus diisi.",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }

        MySwal.fire({
            title: "Konfirmasi Tambah Kue",
            text: "Apakah Anda yakin ingin menambahkan kue ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Tambah!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post("https://delivery-cake-api.vercel.app/api/api/cakes", {
                        name: namaCakes,
                        flavor,
                        size,
                        price: parseFloat(price),
                    });

                    if (response.status === 201) {
                        MySwal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Kue berhasil ditambahkan!",
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            showConfirmButton: false,
                        });
                        setNamaCakes("");
                        setFlavor("");
                        setSize("");
                        setPrice("");
                    }
                } catch (error) {
                    MySwal.fire({
                        icon: "error",
                        title: "Gagal",
                        text: "Terjadi kesalahan dalam menyimpan data.",
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
            <h2 className="mb-4">Create Cake</h2>

            {/* NavLink untuk kembali ke List Cakes */}
            <NavLink to="/cakes" className="btn btn-secondary mb-3">
                Kembali ke List Cakes
            </NavLink>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Kue</label>
                    <input
                        type="text"
                        className="form-control"
                        value={namaCakes}
                        onChange={(e) => setNamaCakes(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Flavor</label>
                    <input
                        type="text"
                        className="form-control"
                        value={flavor}
                        onChange={(e) => setFlavor(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <input
                        type="text"
                        className="form-control"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}
