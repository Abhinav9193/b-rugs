import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home/Home";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
