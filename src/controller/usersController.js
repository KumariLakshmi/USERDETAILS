const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addUser(req, res) {
    if (!req.body.userName || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Please Provide Required Field",
      });
    }
    userModel.find({ email: req.body.email }).exec((err, result) => {
      if (err) {
        console.log("Error", err);
      } else {
        if (result.length > 0) {
          return res.send({
            message: "Already Use These Email",
          });
        } else {
          let user = new userModel(req.body);

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              console.log("Error", err);
            } else {
              bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                  console.log("Error", err);
                } else {
                  user.password = hash;

                  user.save((err, result) => {
                    if (err) {
                      console.log("Error", err);
                    } else {
                      console.log("user Data Added Successfully", result);

                      return res.status(200).send({
                        message: "Add user",
                        status: true,
                        data: result,
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  },
  loginUser: async (req, res) => {
    try {
      userModel.findOne({ email: req.body.email }, (err, user) => {
        if (err)
          return res.status(400).send({
            status: false,
            message: "Please try after some time",
          });
        if (!user)
          return res.status(400).send({
            status: false,
            message: "You are not registered!",
          });
        bcrypt.compare(req.body.password, user.password, (err, data) => {
          if (!data)
            return res.status(400).send({
              status: false,
              message: "Wrong password!",
            });
          else
            return res.status(200).send({
              status: true,
              token: jwt.sign(
                { email: user.email, _id: user._id },
                "secret",
                {}
              ),
              data: user,
            });
        });
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        status: false,
      });
    }
  },
  getOneUser: async (req, res) => {
    try {
      let getOneUser = await userModel.findOne({ userId: req.body.userId });
      if (!getOneUser) {
        return res.send({
          message: "please enter the getOneuser",
        });
      }
      return res.send({
        message: "One User Detail Successfully",
        status: 1,
        data: getOneUser,
      });
    } catch (error) {
      return res.send({
        message: "Please Enter All  User Details ",
        status: 0,
      });
    }
  },
  getOneAllUser: async (req, res) => {
    try {
      let getAlluser = await userModel.find({});
      if (!getAlluser) {
        return res.send({
          message: "please enter the getAlluser",
        });
      }
      return res.send({
        message: "User Details GetAllUser Successfully",
        status: 1,
        data: getAlluser,
      });
    } catch (error) {
      return res.send({
        message: "getAllUser Please Enter All  User Details ",
        status: 0,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      let updateUser = await userModel.findOne({ _id: req.body._id });
      if (!updateUser) {
        return res.send({
          message: "please enter vaild userdetails",
        });
      }
      let updateduser = await userModel.findOneAndUpdate(
        { _id: req.body._id },
        // which fileds you are update
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (updateduser) {
        return res.send({
          message: "No User Details found",
        });
      }
      return res.send({
        message: "User details update Successfully",
        status: 1,
        data: updateduser,
      });
    } catch (error) {
      return res.send({
        message: "updateUser Please Enter All  User Details ",
        status: 0,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      let deleteUser = await userModel.findOne({ _id: req.body._id });
      if (!deleteUser) {
        return res.send({
          message: "please enter the UserId",
        });
      }
      let deletedUser = await userModel.remove({
        _id: req.body._id,
      });
      if (!deletedUser) {
        return res.send({
          message: "No User Details found",
        });
      }
      return res.send({
        message: "User details delete Successfully",
        status: 1,
        data: deletedUser,
      });
    } catch (error) {
      return res.send({
        message: " delete User Please Enter All  Users Details ",
        status: 0,
      });
    }
  },
};
