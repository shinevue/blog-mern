const router = require("express").Router();
const {
  read,
  add,
  update,
  deleteblog,
  like,
  watch,
  readone
} = require("../controller/blogController");

router.get("/read", read);
router.get("/readone/:id", readone);
router.post("/add/:id", add);
router.post("/update/:id", update);
router.delete("/delete/:id", deleteblog);
router.get("/like/:id", like);
router.get("/watch/:id", watch);

module.exports = router;
