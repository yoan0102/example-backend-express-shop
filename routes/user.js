const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/user");

const { errorValidation } = require("../middleware/errorValidation");
const { isRoleValido, issetEmail } = require("../helpers/bd-validators");

const router = Router();

router.get("/", getUsers);
router.put("/:id", [], putUsers);
router.post(
  "/",
  [
    check("name", "El name es obligatorioo").notEmpty(),
    check(
      "password",
      "El password es obligatorio y mas de 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(issetEmail),
    // check("role", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValido),
    errorValidation,
  ],
  postUsers
);
router.delete("/:id", deleteUsers);
router.patch("/:id", patchUsers);

module.exports = router;
