const router = require("express").Router();
const axios = require("axios");
const { branchController } = require("../controllers/index");
require("dotenv/config");

router.get("/getAll", branchController.getAll);
router.patch("/setBranch/:id", branchController.setBranch);
router.delete("/remove/:id", branchController.deleteBranch);
router.post("/branchById", branchController.branchById);
router.post("/create", branchController.createBranch);
router.patch("/updateBranch/:id", branchController.updateBranch);
router.get("/adminByBranch/:id", branchController.findAdminByBranch);

axios.defaults.baseURL = process.env.BASE_URL_RAJAONGKIR;
axios.defaults.headers.common["key"] = process.env.RAJA_KEY;
axios.defaults.headers.post["Content-Type"] = process.env.AXIOS_HEADERS;
router.get("/province", (req, res) => {
  axios
    .get("/province")
    .then(response => res.json(response.data))
    .catch(err => res.send(err));
});
router.get("/city/:provinceId", (req, res) => {
  const id = req.params.provinceId;
  axios
    .get(`/city?province=${id}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err));
});

module.exports = router;
