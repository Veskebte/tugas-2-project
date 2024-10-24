import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditCake() {
    const { id } = useParams();
    const [cake, setCake] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchCakeDetails();
    }, []);

    const fetchCakeDetails = async () => {
        try {
            const response = await axios.get(`https://delivery-cake-api.vercel.app/api/api/cakes/${id}`);
            setCake(response.data.result);
        } catch (error) {
            setError("Error: " + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.put(`https://delivery-cake-api.vercel.app/api/api/cakes/${id}`, cake);
            if (response.status === 200) {
                setSuccess("Kue berhasil diperbarui.");
            }
        } catch (error) {
            setError("Error: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Cake</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Kue</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cake.name || ""}
                        onChange={(e) => setCake({ ...cake, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Flavor</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cake.flavor || ""}
                        onChange={(e) => setCake({ ...cake, flavor: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cake.size || ""}
                        onChange={(e) => setCake({ ...cake, size: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={cake.price || ""}
                        onChange={(e) => setCake({ ...cake, price: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
}
