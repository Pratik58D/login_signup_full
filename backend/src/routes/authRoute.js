const express = require("express");
const {signup , login} = require("../Controllers/AuthController");
const { singupValidation, LoginValidation } = require("../Middleware/validation");

const router =  express.Router();

router.post("/login",LoginValidation,login);
router.post("/signup",singupValidation,signup);



module.exports = router


