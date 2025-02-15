import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function AppLayout() {
  useEffect(() => {
    document.title = "AdDemande.com";
  }, []);
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default AppLayout;
