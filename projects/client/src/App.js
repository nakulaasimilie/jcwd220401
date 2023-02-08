//Function and Redux
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartSync } from "./redux/cartSlice";
import { login } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";

//Component and Pages
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginUser";
import { UserProfile } from "./pages/ProfilePage";
import { ChangePassword } from "./pages/ChangePassword";
import Register from "./components/register";
import DetailPage from "./pages/DetailPage";
import NotFound from "./components/404";
import Search from "./components/search";
import CartPage from "./pages/cartPage";
import { LoginAdmin } from "./pages/LoginAdmin";
import { AdminPage } from "./pages/AdminPage";
import { ListAddressUser } from "./components/listAddressUser";
import { AddAddress } from "./components/addAddress";
import { UpdateAddress } from "./components/updateAddress";
import SendEmailPassword from "./pages/SendEmailPage";
import ResetPassword from "./pages/ResetPassword";
import { Add } from "./components/produkManagement";
import CreateComp, { AddProduct } from "./components/addProduk";
import BarAdmin from "./components/BarAdmin";
import { BranchManagement } from "./components/BranchManagement";
import Footer from "./components/footerComp";
import { AdminInventory } from "./components/addInventory";
import { BranchOrderList } from "./components/branchOrderList";
import { OrderList } from "./components/orderListPage";
import { syncBranch } from "./redux/branch";
import { syncInventory } from "./redux/inventorySlice";
// import { AddCategory } from "./components/addCategory";

//keeplogin url
const urlKeepLogin = `${process.env.REACT_APP_API_BASE}/usersLogin/keepLogin`;

function App() {
  //keeplogin token
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const tokenBranch = localStorage.getItem("tokenBranch");
  const { id } = useSelector(state => state.branchSlice.value);

  // console.log(token)

  //Function keeplogin
  const keepLogin = async () => {
    try {
      const res = await axios.get(urlKeepLogin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);

      // Get cart data by id user
      const cart = await axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/${res.data.id}`,
      );
      dispatch(cartSync(cart.data));
      dispatch(login(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   keepLogin();
  // }, []);

  const keepLoginAdmin = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE}/admin/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        },
      );
      console.log(res.data);
      dispatch(loginAdmin(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginBranch = async () => {
    try {
      const resBranch = await axios.get(
        `${process.env.REACT_APP_API_BASE}/admin/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenBranch}`,
          },
        },
      );
      console.log(resBranch.data);
      dispatch(loginAdmin(resBranch.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    token ? keepLogin() : console.log("Check Database");
  }, []);

  useEffect(() => {
    tokenAdmin ? keepLoginAdmin() : console.log("Check Database");
  }, []);

  useEffect(() => {
    tokenBranch ? keepLoginBranch() : console.log("Check Database");
  }, []);

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = location => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!"geolocation in navigator") {
      onError({
        code: 0,
        message: "geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  console.log(location);

  const getBranch = async () => {
    try {
      const branch = {
        lattitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        // lattitude: " -6.0793752",
        // longitude: "106.6528214",
      };
      console.log(branch);
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE}/branch/branchById`,
        branch,
      );
      console.log(result.data);
      dispatch(syncBranch(result.data));
      console.log(result.data);
    } catch {}
  };
  useEffect(() => {
    getBranch();
  }, [location]);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE}/inventory/findAllByBranch/${id}`,
      );
      dispatch(syncInventory(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
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
    // <div style={bodyStyle}>
    //   <div style={myStyle}>
    <Routes>
      <Route
        path="/dashboard"
        element={
          <>
            <AdminPage />
          </>
        }
      />

      <Route
        path="/addInventory"
        element={
          <>
            <AdminInventory />
          </>
        }
      />

      <Route
        path="/profile"
        element={<UserProfile />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/changePassword"
        element={
          <>
            <ChangePassword />
            <Navbar />
          </>
        }
      />
      <Route
        path="/loginAdmin"
        element={<LoginAdmin />}
      />

      <Route
        path="/cart"
        element={
          <>
            <CartPage />
          </>
        }
      />
      <Route
        path="/address"
        element={
          <>
            <ListAddressUser />
          </>
        }
      />
      <Route
        path="/address/:id"
        element={
          <>
            <ListAddressUser />
            <Navbar />
          </>
        }
      />
      <Route
        path="/dashboard/crud"
        element={
          <>
            <BarAdmin />
            <Add />
            <Footer />
          </>
        }
      />

      <Route
        path="/create"
        element={
          <>
            <CreateComp />
          </>
        }
      />
      <Route
        path="/updateAddress/:id"
        element={
          <>
            <UpdateAddress />
            <Navbar />
          </>
        }
      />
      <Route
        path="/addAddress/:id"
        element={
          <>
            <AddAddress />
          </>
        }
      />

      <Route
        path="/dashboard/branchManagement"
        element={
          <>
            <BarAdmin />
            <BranchManagement />
            <Footer />
          </>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <NotFound />
            <Navbar />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <HomePage />
          </>
        }
      />

      <Route
        path="/detail/:id"
        element={
          <>
            <DetailPage />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Register />
          </>
        }
      />
      <Route
        path="/verifyResetPassword"
        element={
          <>
            <SendEmailPassword />
          </>
        }
      />
      <Route
        path="/resetPassword"
        element={
          <>
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/dashboard/orderList"
        element={
          <>
            <BarAdmin />
            <OrderList />
            <Footer />
          </>
        }
      />
      <Route
        path="/dashboard/branchOrder"
        element={
          <>
            <BarAdmin />
            <BranchOrderList />
            <Footer />
          </>
        }
      />
    </Routes>
    //   </div>
    // </div>
  );
}

export default App;
