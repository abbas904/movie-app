import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Routes from "./routes/Routes";

import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();

  // Paths you don't want to show header and footer in
  const noHeaderFooterPaths = ["/login", "/signin", "/register", "/signup"];

  const hideHeaderFooter = noHeaderFooterPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
