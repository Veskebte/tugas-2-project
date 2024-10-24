import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

// Lazy load komponen
const Home = React.lazy(() => import("./components/Home"));
const CakesList = React.lazy(() => import("./components/Cakes/List"));
const CakesCreate = React.lazy(() => import("./components/Cakes/Create"));
const CakesEdit = React.lazy(() => import("./components/Cakes/Edit"));
const OrdersList = React.lazy(() => import("./components/Orders/ListOrders"));
const OrdersCreate = React.lazy(() => import("./components/Orders/Create"));
const OrdersEdit = React.lazy(() => import("./components/Orders/Edit"));

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">MDP</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  to="/cakes"
                >
                  Cakes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  to="/orders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Konten utama */}
      <div className="container mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Cakes Routes */}
            <Route path="/cakes" element={<CakesList />} />
            <Route path="/cakes/create" element={<CakesCreate />} />
            <Route path="/cakes/edit/:id" element={<CakesEdit />} />

            {/* Orders Routes */}
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/create" element={<OrdersCreate />} />
            <Route path="/orders/edit/:id" element={<OrdersEdit />} />
          </Routes>
        </Suspense>

        <footer className="mt-4">
          <div className="text-center">&copy; 2024 Mahasiswa</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
