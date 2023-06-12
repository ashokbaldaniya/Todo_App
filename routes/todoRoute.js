const router = require("express").Router()

const { todoAdd, todoUpdate, todoView, todoDelet, todoGet } = require("../controllers/todoController")

const auth = require("../middleware/auth")

router.post("/add", auth, todoAdd)
router.put("/update/:id", auth, todoUpdate)
router.get("/view/:id", auth, todoView)
router.get("/delete/:id", auth, todoDelet)
router.get("/get", todoGet)

module.exports = router