const { Router } = require("express");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", postUsers);
router.delete("/:id", deleteUsers);
router.patch("/:id", patchUsers);

module.exports = router;
