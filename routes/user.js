const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require("../controller/user_controller");

//router.post('/adminedit',moviesController.adminEdit);
router.post("/create", userController.createUser);
router.post("/createSession", userController.createSession);
router.get("/loggedUsed", auth, userController.loggedUser);
//router.get('/find',moviesController.find);

module.exports = router;
