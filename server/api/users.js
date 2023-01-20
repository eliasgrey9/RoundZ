const express = require("express");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//This function helps us verify a user has been authenticated
const authenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ logout: true });
  }
};

//***LOGIN***/
router.post("/login", async (req, res) => {
  console.log("login req.body", req.body);
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.status(401).send("Invalid email or password.");
  } else {
    const authenticated = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (authenticated) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({ token });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  }
});
//***END OF LOGIN***/

//***SIGN UP***/
router.post("/signup", async (req, res) => {
  // validate email and password before checking if user exists and moving on
  // check if email already exists
  // you'll probably want to query the database right here
  console.log("signup req.body", req.body);
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    // if user exists, return error
    res.status(400).send("Invalid email or password.");
  } else {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create user object
    const user = {
      email: req.body.email,
      password: hashedPassword,
    };

    // store user in database
    await User.create(user);

    // create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token });
  }
});
//***END OF SIGN UP***//

//EXAMPLES!!!///
router.get("/route-that-requires-auth", authenticated, (req, res) => {
  res.send("You are authenticated!");
});

router.get("/route-that-is-public", (req, res) => {
  res.send("We don't care if you are authenticated!");
});

// router.get("/user/:id", [authenticated, onlyOwner], (req, res) => {
//   res.send("You are authenticated and you own this user!");
// });

module.exports = router;

// WILL NEED TO UPDATE THIS SO A SPECIFIC USER ONLY HAS ADMIN ACCESS TO THEIR OWN ITEMS AND MODEL PROPERTIES.
//UPDATING WILL BEGIN AFTER USER/LOGIN IS SUCCESSFUL WITH DASHBOARD TO VIEW IN HOUSE ITEMS AND USER INFORMATION.
// const onlyOwner = (req, res, next) => {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const decodedToken = jwt.verify(token, JWT_SECRET);

//       if (decodedToken.id === parseInt(req.params.id)) {
//         next();
//       } else {
//         res.status(401).json("nope");
//       }
//     } catch {
//       res.status(401).json("Unauthorized");
//     }
//   };
