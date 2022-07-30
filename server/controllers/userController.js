const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.userSignup = function (req, res) {
  //check if request is  empty
  if (!req.body) {
    return res.status(400).json({
      message: "enter your details",
      success: false,
    });
  }

  let { name, email, password, confirmPassword } = req.body;
  //check for input params
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    confirmPassword !== password
  ) {
    return res.status(400).json({
      message: "Invalid Input",
      success: false,
    });
  }

  try {
    //if user already exists
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error ",
          success: false,
        });
      }

      if (!user) {
        let newUser = new User();
        (newUser.name = name), (newUser.email = email);
        // Call setPassword function to hash password
        newUser.setPassword(password);

        try {
          newUser.save(function (err, user) {
            if (err) {
              return res.status(500).json({
                message: "Internal Server Error",
                success: false,
              });
            }

            const token = jwt.sign(user.toJSON(), "zoho564", {
              expiresIn: "100000",
            });

            return res.json({
              message: "user created succesfully ",
              data: token,
              success: true,
            });
          });
        } catch (error) {
          console.log(error, "error while creating user ");
          return res.json(500, {
            message: "Internal Server Error",
          });
        }
      } else {
        //user already exist
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

    if (!user) {
      return res.status(400).send({
        message: "User not Found",
        success: false,
        user: null,
      });
    }
    //if password is valid
    if (user.validPassword(req.body.password)) {
      const token = jwt.sign(user.toJSON(), "zoho564", {
        expiresIn: 100000,
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
