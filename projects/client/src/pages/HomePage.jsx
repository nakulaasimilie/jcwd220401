import React from "react";
import HomeComp from "../components/HomeComp";
import Footer from "../components/footerComp";
import Search from "../components/search";
import Kategori from "../components/kategori";
import Navbar from "../components/navbar";
import Product from "../components/product";

export default function HomePage() {
  const header = {
    backgroundColor: "#ebf5e9",
    width: "auto",
    height: "350px",
    borderBottomLeftRadius: "25px",
    borderBottomRightRadius: "25px",
  };

  return (
    <div>
      <div style={header}>
        <Search />
        <HomeComp />
      </div>
      <Kategori />
      <Product />
      <Footer />
      <Navbar />
    </div>
  );
}
