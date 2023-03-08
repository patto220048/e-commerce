const express = require('express');
const router = express.Router();


const userController = require("../controller/userController")
const verify = require("../controller/veryfiToken")

router.put("/:id", verify.verifyUser, userController.updateUser)
router.get("/:id", verify.verifyUser, userController.getUser)
router.delete("/:id", verify.verifyUser, userController.deleteUser)
router.get("/", verify.verifyUser, userController.getAllUser)


module.exports  = router