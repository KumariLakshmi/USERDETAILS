const router = require("express").Router();

const user = require("../controller/usersController");

/**
 * @api {POST} /User/addUser
 * @desc  Add User API
 * @access public
 * **/
router.post("/addUser", user.addUser);
/**
 * @api {POST} /User/loginUser
 * @desc  Login User API
 * @access public
 * **/
router.post("/loginUser", user.loginUser);
/**
 * @api {GET} /User/getOneUser
 * @desc  OneUser User API
 * @access public
 * **/
router.get("/getOneUser", user.getOneUser);
/**
 * @api {GET} /User/getAllUser
 * @desc  AllUser User API
 * @access public
 * **/
router.get("/getAllUser", user.getOneAllUser);
/**
 * @api {PUT} /User/UpdateUser
 * @desc  UpdateUser User API
 * @access public
 * **/
 router.put("/updateUser", user.updateUser);
 /**
 * @api {Delete} /User/DeleteUser
 * @desc  DeleteUser User API
 * @access public
 * **/
  router.delete("/deleteUser", user.deleteUser);
module.exports = router;
