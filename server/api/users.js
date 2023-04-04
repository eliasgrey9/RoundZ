const express = require("express");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Position, Question, db, Answer, Candidate } = require("../db");


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

const onlyOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id === parseInt(req.params.id)) {
      next();
    } else {
      res.status(401).json("nope");
    }
  } catch {
    res.status(401).json("Unauthorized");
  }
};


// SIGN IN
router.post("/signIn", async (req, res) => {
  console.log("signIn req.body", req.body);
  const user = await User.findOne({ where: { email: req.body.email } });
  
  if (!user) {
  res.status(401).send("Invalid email or password.");
  } else {
  const authenticated = await bcrypt.compare(
  req.body.password,
  user.password
  );if (authenticated) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  
    res.json({ token:token, userId:user.id });
  } else {
    res.status(401).send("Invalid email or password.");
  }
}
});  
    

//***SIGN UP***/
router.post("/signUp", async (req, res) => {
  // validate email and password before checking if user exists and moving on
  // check if email already exists
  console.log("signUp req.body", req.body);
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    // if user exists, return error
    res.status(400).send("User already exists!.");
  } else {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create user object
    const user = {
      email: req.body.email,
      fullName:req.body.fullName,
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

router.get("/user/:id", [authenticated, onlyOwner], (req, res) => {
  res.send("You are authenticated and you own this user!");
});

router.get("/findAllActiveJobsByUser/:id", [authenticated, onlyOwner], async (req, res, next) => {
  try {
    const result = await Position.findAll({
      where: { status: true, userId:req.params.id },
      include: Question,
    });
    res.send(result);
  } catch (error) {
    console.log("get REQ ERROR", error);
    next(error);
  }
});

module.exports = router;



