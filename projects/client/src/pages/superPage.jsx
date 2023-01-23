import React from "react";
import HomeComp from "../components/HomeComp";
import Footer from "../components/footerComp";
import BarAdmin from "../components/BarAdmin";
import { BranchAdmin, BranchManagement } from "../components/BranchManagement";

export default function SuperPage() {
  return (
    <>
      <BarAdmin />
      <BranchManagement />
      <Footer />
    </>
  );
}
