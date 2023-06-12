const mongoose = require("mongoose")

const connectdb = async () => {
    await mongoose.connect(process.env.dburl).then(() => {
        console.log("db connected...");
    }).catch(err => {
        console.log(err);
    })
}

module.exports = connectdb