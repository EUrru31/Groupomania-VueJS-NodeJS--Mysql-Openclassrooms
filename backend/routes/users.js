const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

const users = require("../controllers/users.js");

// Create a new User
router.post("/users", userCtrl.create);

// Retrieve all Users
router.get("/users", userCtrl.findAll);

// Retrieve a single User with userId
router.get("/users/:userId", userCtrl.findOne);
router.get("/users/id/:userId", userCtrl.findById);

// Update a User with userId
router.put("/users/:userId", userCtrl.update);

// Delete a User with userId
router.delete("/users/:userId", userCtrl.delete);

// Create a new User
router.delete("/users", userCtrl.deleteAll);

module.exports = router;
