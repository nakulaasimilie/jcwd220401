require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");

//sequileze db
const db = require("./models");

//bearer Token
const bearerToken = require("express-bearer-token");

//userRouters
const {
  userRoutesLogin,
  cartRoutes,
  userRoutes,
  userRoutesAdmin,
  productRoutes,
  userRoutesBranch,
  addressRoutes,
  transaksiRoutes,
  inventoryRoutes,
} = require("./routers");

const PORT = process.env.PORT || 8000;
const app = express();
// app.use(
// //   cors()
// //   //   {
// //   //   origin: [
// //   //     process.env.WHITELISTED_DOMAIN &&
// //   //       process.env.WHITELISTED_DOMAIN.split(","),
// //   //   ],
// //   // }
// // );
app.use(cors());
app.use(express.json());
app.use(bearerToken());
//#region API ROUTES

// ===========================
// NOTE : Add your routes here

// user Router
app.use("/usersLogin", userRoutesLogin);
app.use("/admin", userRoutesAdmin);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/branch", userRoutesBranch);
app.use("/address", addressRoutes);
app.use("/transaksi", transaksiRoutes);
app.use("/inventory", inventoryRoutes);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use("/users", userRoutes);
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
// const clientPath = "../images";
// app.use(express.static(join(__dirname, clientPath)));

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, err => {
  db.sequelize.sync({ alter: true });
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
