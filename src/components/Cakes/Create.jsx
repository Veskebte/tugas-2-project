import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateCakes() {
    const [namaCakes, setNamaCakes] = useState("");
    const [flavor, setFlavor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!namaCakes || !flavor || !size || !price) {
            Swal.fire("Error", "Semua kolom harus diisi.", "error");
            return;
        }

        try {
            const response = await axios.post("https://delivery-cake-api.vercel.app/api/api/cakes", {
                name: namaCakes,
                flavor,
                size,
                price: parseFloat(price),
            });

            if (response.status === 201) {
                Swal.fire("Berhasil", "Kue berhasil ditambahkan.", "success");
                setNamaCakes("");
                setFlavor("");
                setSize("");
                setPrice("");
            }
        } catch (error) {
            Swal.fire("Error", "Terjadi kesalahan dalam menyimpan data.", "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Cake</h2>

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
