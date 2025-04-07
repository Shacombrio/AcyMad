import NavBar from "./NavBar"; // Importar el NavBar
import Footer from "./Footer"; // Importar el Footer

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <NavBar /> {/* NavBar siempre visible */}
      <main>{children}</main> {/* Contenido dinámico */}
      <Footer /> {/* Footer siempre visible */}
    </div>
  );
};

export default MainLayout;