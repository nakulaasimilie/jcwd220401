const router = require("express").Router();
const { productController } = require("../controllers");
const { multerUpload } = require("../helper/multer");

router.get("/list", productController.getAll);
router.post("/create", productController.create);
router.get("/list/filter", productController.getBy);
router.get("/search", productController.searchBy);
router.get("/view", productController.view);
router.get("/sort", productController.sortBy);
router.get("/list/:id", productController.getById);
router.delete("/remove/:id", productController.remove);
router.get("/list/total", productController.totalProduct);
router.post("/createCategory", productController.createCategory);
router.get("/listCategory", productController.getAllCategory);
router.patch("/updateCategory/:id", productController.updateCategory);
router.delete("/removeCategory/:id", productController.removeCategory);
router.patch("/update/:id", productController.update);
router.post(
  "/single-uploaded-category/:id",
  multerUpload.single("file"),
  productController.uploadCategory,
);

module.exports = router;
