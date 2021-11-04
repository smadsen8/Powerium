const express = require("express");

const UserCtrl = require("../control/user-control");

const router = express.Router();

router.post("/user", UserCtrl.createUser);
router.get("/user/:email", UserCtrl.getUserbyEmail);

module.exports = router;
