const User = require("../models/User")
const jwt = require("jsonwebtoken")


// const eres = {
//     success: false,
//     message: "unauthorised"
// }

const auth = async function (req, res, next) {
    try {
        const token = req.headers.authorization

        const userInfo = await jwt.verify(token, process.env.skey);
        const valid = await User.find({ _id: userInfo._id })
        if (valid.length) {
            req.user = userInfo
            next()
        }
        else {
            // res.send(eres)
            return next(error)
        }
    } catch (error) {
        // res.send(eres)
        return next(error)
    }
}
module.exports = auth