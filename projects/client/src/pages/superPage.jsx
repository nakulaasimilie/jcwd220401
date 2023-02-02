import React from "react";
import Footer from "../components/footerComp";
import BarAdmin from "../components/BarAdmin";
import { BranchManagement } from "../components/BranchManagement";
import StatsComp from "../components/StatsComp";
import Axios from "axios";
import { syncName } from "../redux/nameSlice";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/listSlice";
import { useEffect } from "react";
import { loanSync } from "../redux/loanAdminSlice";

export default function SuperPage() {
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/product/list`);
      console.log(res.data);
      dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getUser = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/users/allUser`);
      console.log(res.data);
      dispatch(syncName(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getTrans = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/transaksi/list`);
      console.log(res.data);
      dispatch(loanSync(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrans();
  }, []);

  return (
    <>
      <BarAdmin />
      <StatsComp />
      <Footer />
    </>
  );
}
