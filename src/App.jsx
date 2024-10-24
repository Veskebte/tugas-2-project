import React, {Suspense} from "react"
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"

const Home = React.lazy(() => import("./components/Home"))
const CakesList = React.lazy(() => import("./components/Cakes/List"))
const CakesCreate = React.lazy(() => import("./components/Cakes/Create"))
const CakesEdit = React.lazy(() => import("./components/Cakes/Edit"))
const OrdersList = React.lazy(() => import("./components/Orders/ListOrders"))
const OrdersCreate = React.lazy(() => import("./components/Orders/Create"))
const OrdersEdit = React.lazy(() => import("./components/Orders/Edit"))
function App() {

  return (
    <Router>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">MDP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={({isActive}) => 'nav-link ${isActive ? "active" : "" }'} aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive}) => 'nav-link ${isActive ? "active" : "" }'} aria-current="page" to="/Cakes">Cakes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive}) => 'nav-link ${isActive ? "active" : "" }'} aria-current="page" to="/Orders">Orders</NavLink>
              </li>
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cakes" element={<CakesList />} />
          <Route path="/Cakes/create" element={<CakesCreate />} />
          <Route path="/Cakes/edit/:id" element={<CakesEdit />} />
          <Route path="/Orders" element={<OrdersList />} />
          <Route path="/Orders/create" element={<OrdersCreate />} />
          <Route path="/Orders/edit/:id" element={<OrdersEdit />} />
        </Routes>
      </Suspense>

      <div>&copy; 2024 Mahasiswa</div>
      </div>
    </Router>
  )
}

export default App
