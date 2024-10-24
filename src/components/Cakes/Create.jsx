import React, { useState } from "react";
import axios from "axios";

export default function CreateCakes() {
    const [namaCakes, setNamaCakes] = useState("");
    const [flavor, setFlavor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!namaCakes || !flavor || !size || !price) {
            setError("Semua kolom harus diisi.");
            return;
        }

        try {
            const response = await axios.post("https://delivery-cake-api.vercel.app/api/api/cakes", {
                name: namaCakes,
                flavor,
                size,
                price: parseFloat(price)
            });

            if (response.status === 201) {
                setSuccess("Kue berhasil ditambahkan.");
                setNamaCakes("");
                setFlavor("");
                setSize("");
                setPrice("");
            } else {
                setError("Terjadi kesalahan dalam menyimpan data.");
            }
        } catch (error) {
            setError("Error: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Cake</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

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
