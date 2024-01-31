var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require("./User");

router.post("/", async function (req, res) {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).send(user);
  } catch (err) {
    res
      .status(500)
      .send("There was a problem adding the information to the database.");
  }
});

router.get("/", async function (req, res) {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("There was a problem finding the users.");
  }
});

router.get("/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("No user found.");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("There was a problem finding the user.");
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const user = await User.findByIdAndRemove(req.params.id).exec();

    if (!user) {
      return res.status(404).send("No user found.");
    }

    res.status(200).send("User " + user.name + " was deleted.");
  } catch (err) {
    res.status(500).send("There was a problem deleting the user.");
  }
});

router.put("/:id", async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).send("No user found.");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("There was a problem updating the user.");
  }
});

module.exports = router;
