import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListCakes() {
    const [cakes, setCakes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCakes();
    }, []);

    const fetchCakes = async () => {
        try {
            const response = await axios.get("https://delivery-cake-api.vercel.app/api/api/cakes");
            setCakes(response.data.result);
        } catch (error) {
            setError("Error: " + error.message);
        }
    };

    const deleteCake = async (id) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kue akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://delivery-cake-api.vercel.app/api/api/cakes/${id}`);
                    setCakes(cakes.filter((cake) => cake.id !== id));
                    Swal.fire('Terhapus!', 'Kue telah berhasil dihapus.', 'success');
                } catch (error) {
                    setError("Error: " + error.message);
                }
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">List of Cakes</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <NavLink to="/Cakes/create" className="btn btn-primary mb-3">Tambah Kue</NavLink>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Flavor</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cakes.map((cake) => (
                        <tr key={cake.id}>
                            <td>{cake.name}</td>
                            <td>{cake.flavor}</td>
                            <td>{cake.size}</td>
                            <td>{cake.price}</td>
                            <td>
                                <Link to={`/cakes/edit/${cake.id}`} className="btn btn-warning">Edit</Link>
                                <button onClick={() => deleteCake(cake.id)} className="btn btn-danger ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
