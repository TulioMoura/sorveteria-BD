const express = require("express")
let router = express.Router()


router.get('/',(req,res)=>{
    res.send("fornecedores")
})

module.exports = router