const User = require("../models/user");
const jwt = require("jsonwebtoken");

//signup
function createUser(userDetails) {
  let newUser = new User();
  (newUser.name = userDetails.name), (newUser.email = userDetails.email);
  // Call setPassword function to hash password
  newUser.setPassword(userDetails.password);

  try {
    newUser.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
        });
      }
      return res.json({
        message: "user created succesfully ",
        success: true,
      });
    });
  } catch (error) {
    console.log(error, "error while creating user ");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
}

module.exports.userSignup = function (req, res) {
  //check if request is  empty
  if (!req.body) {
    return res.status(400).json({
      message: "enter your details",
      success: false,
    });
  }

  let { email, password, confirmPassword } = req.body;
  //check for input params
  if (!email || !password || !confirmPassword || confirmPassword !== password) {
    return res.status(400).json({
      message: "Invalid Input",
      success: false,
    });
  }

  try {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error ",
          success: false,
        });
      }

      if (!user) {
        createUser(req.body);
      } else {
        return res.status(403).json({
          message: "User Already exists",
          success: false,
        });
      }
    });
  } catch (error) {
    console.log(error, "Error in finding user in signing up");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

//login-handler
module.exports.createSession = async function (req, res) {
  try {
    var user = await User.findOne({ email: req.body.email });

    if (user.validPassword(req.body.password)) {
      const token = jwt.sign(user.toJSON(), "zoho564", {
        expiresIn: "100000",
      });

      return res.status(200).json({
        message: "Sign in successful, here is your token, please keep it safe!",
        data: token,
      });
    } else {
      return res.status(400).send({
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    console.log(err, "cannot find user while signing up ");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
