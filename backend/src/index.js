const express = require("express")
const router = require("./routes/routes.js")
const app = express()

app.use(express.json())
app.use("/",router)

app.listen(4000,()=>{
    console.log("Server running at port 4000!\n")
})
