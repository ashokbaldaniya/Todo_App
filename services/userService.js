const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = {
  userRegister: async (params) => {
    const users = new User(params)
    await users.save()
    return users;
  },

  userLogin: async (params) => {
    const users = await User.findOne({ email: params.email })
    const isvalid = await bcrypt.compare(params.password, users.password)
    if (isvalid) {
      const token = await users.generateToken();
      return token
    }
  }
}
