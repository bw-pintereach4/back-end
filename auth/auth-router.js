//Authentication
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("../routers/users/user-model");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const userInfo = req.body;
    const user = await Users.findBy(userInfo.username).first();

    const hash = bcrypt.hashSync(userInfo.password, 12);

    userInfo.password = hash;

    if (user) {
      return res.status(409).json({
        message: "username is taken",
      });
    }

    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy(username).first();

    if (!user) {
      return res.status(428).json({
        message: "Login details invalid",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status(401).json({
        message: "Invalid password",
      });
    }

    const tokenPayload = {
      userId: user.id,
    };

    res.status(200).json({
      welcome: `Welcome, ${user.username}!`,
      token: jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "120m",
      }),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
