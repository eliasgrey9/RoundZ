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
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);

    const userId = createdUser.id;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    res.json({ token, userId });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

//***END OF SIGN UP***//

//***ROUTES FOR USERS */
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

router.get("/findAllClosedJobsByUser/:id", [authenticated, onlyOwner], async (req, res, next) => {
  try {
    const result = await Position.findAll({
      where: { status: false, userId:req.params.id },
      include: Question,
    });
    res.send(result);
  } catch (error) {
    console.log("get REQ ERROR", error);
    next(error);
  }
});


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



module.exports = router;



