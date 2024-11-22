const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const app = express()
const PORT = process.env.port || 9000


const dbcon = require("./config/db")
dbcon();

app.use(express.json())

const userroutes = require("./routes/userRoute")
app.use("/api/user", userroutes)

const todoroute = require("./routes/todoRoute")

app.use("/api/todo", todoroute)


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})