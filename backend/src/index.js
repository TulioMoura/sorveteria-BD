const express = require("express")
require("dotenv").config()
const router = require("./routes/routes.js")
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware.js")
const app = express()

app.use(express.json())
app.use("/", router)

app.use(errorHandlerMiddleware) //custom error handler to invalid json bodies

app.listen(4000, () => {
    console.log("Server running at port 4000!\n")
})

