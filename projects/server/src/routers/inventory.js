const router = require("express").Router();
const { inventoryController } = require("../controllers");

router.post("/create", inventoryController.create);
router.get("/findByBranch/:from/:to", inventoryController.findByBranch);
router.get("list/total", inventoryController.totalProduct);
router.get("/search", inventoryController.searchBy);
router.get("/sort", inventoryController.sortBy);
router.get("/findAllByBranch/:BranchId", inventoryController.findAllByBranch);

module.exports = router;
