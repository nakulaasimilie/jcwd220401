import React from "react";
import Footer from "../components/footerComp";
import StatsComp from "../components/StatsComp";
import Axios from "axios";
import { syncName } from "../redux/nameSlice";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/listSlice";
import { useEffect } from "react";
import { loanSync } from "../redux/loanAdminSlice";
import BarAdminBranch from "../components/barBranch";

export default function BranchPage() {
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/product/list`,
      );
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
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/users/allUser`,
      );
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
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/transaksi/list`,
      );
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
      <BarAdminBranch />
      <StatsComp />
      <Footer />
    </>
  );
}
