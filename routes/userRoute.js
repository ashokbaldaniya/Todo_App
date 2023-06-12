const router = require("express").Router();

const { userRegister, userLogin } = require("../controllers/userController")

router.post("/register", userRegister);
router.get("/login", userLogin)


module.exports = router;
