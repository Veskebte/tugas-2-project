import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditCakes() {
    const { id } = useParams();
    const [namaCakes, setNamaCakes] = useState("");
    const [flavor, setFlavor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        fetchCake();
    }, []);

    const fetchCake = async () => {
        try {
            const response = await axios.get(`https://delivery-cake-api.vercel.app/api/api/cakes/${id}`);
            const cake = response.data.result;
            setNamaCakes(cake.name);
            setFlavor(cake.flavor);
            setSize(cake.size);
            setPrice(cake.price);
        } catch (error) {
            Swal.fire("Error", "Gagal memuat data kue.", "error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!namaCakes || !flavor || !size || !price) {
            Swal.fire("Error", "Semua kolom harus diisi.", "error");
            return;
        }

        try {
            await axios.put(`https://delivery-cake-api.vercel.app/api/api/cakes/${id}`, {
                name: namaCakes,
                flavor,
                size,
                price: parseFloat(price),
            });
            Swal.fire("Berhasil", "Kue berhasil diubah.", "success");
        } catch (error) {
            Swal.fire("Error", "Terjadi kesalahan dalam menyimpan perubahan.", "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Cake</h2>

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
                    Update
                </button>
            </form>
        </div>
    );
}
