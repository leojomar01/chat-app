const { register, login, getAllUsers, updateUserPassword ,deleteAccount} = require("../controllers/usersController")

const router = require("express").Router()

router.post("/register",register)
router.post("/login",login) 
router.get("/allusers/:id",getAllUsers)
router.put("/updatePassword/:id",updateUserPassword)
router.delete("/deleteAccount/:id", deleteAccount);


module.exports = router;