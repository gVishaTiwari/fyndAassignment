const express = require("express");
const router = express.Router();

const userController = require("../controller/user_controller");

//router.post('/adminedit',moviesController.adminEdit);
router.post("/create", userController.createUser);
router.post("/createSession", userController.createSession);
router.post("/loggedUsed", userController.loggedUser);
//router.get('/find',moviesController.find);

module.exports = router;
