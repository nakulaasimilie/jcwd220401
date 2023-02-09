import React from "react";
import Navbar from "../components/navbar";
import CartDetail, { CartComp } from "../components/CartComp";

export default function CartPage() {
  const myStyle = {
    maxWidth: "506px",
    heigth: "auto",
    backgroundColor: "white",
    margin: "auto",
  };
  const bodyStyle = {
    backgroundColor: "grey",
    width: "auto",
    height: "auto",
  };

  return (
    <div style={bodyStyle}>
      <div style={myStyle}>
        <CartComp />
        <Navbar />
      </div>
    </div>
  );
}
