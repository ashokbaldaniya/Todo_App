const userservice = require("../services/userService")

const err = {
  success: false,
  message: "unauthorised"
}

let userData = function (data, message) {
  return {
    success: true,
    message: message,
    data: data
  }
}

module.exports = {
  userRegister: async (req, res) => {
    try {
      const params = { ...req.body }
      const userdata = await userservice.userRegister(params)
      return res.send(userData(userdata, "user registration successfully"))
    } catch (error) {
      return res.send(err)
    }
  },

  userLogin: async (req, res) => {
    try {
      const params = { ...req.body }
      const userToken = await userservice.userLogin(params)
      res.send(userData(userToken, "user login successfully"))
    } catch (error) {
      res.send(err)
    }
  }
}