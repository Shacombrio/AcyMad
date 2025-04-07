import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Layout from "./components/layout";
import ProductDetail from "./components/productDetail.jsx";
import Cart from "./components/Cart"; // Importar el componente Cart
import "./App.css";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Ruta principal que muestra el layout */}
          <Route path="/" element={<Layout />} />
          
          {/* Ruta para los detalles del producto */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Ruta para el carrito */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;