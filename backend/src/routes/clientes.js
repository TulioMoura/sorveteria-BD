const express = require("express")
const router = express.Router()
const model_cliente = require("../models/cliente");
const {v4:uuidv4}= require("uuid")

router.get('/',async(req,res)=>{
    let clientList = await model_cliente.findAll();
    res.send(clientList)
})

router.post('/', async(req,res)=>{
    let cliente;
    try{
       const {nome,endereco,telefone} =  req.body
       let id = uuidv4()
       cliente = {nome,endereco,telefone,id}            
        await model_cliente.create(cliente)
        res.send(200)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {id, nome,endereco,telefone} =  req.body  
     if(!model_cliente.findByPk(id)){
      throw new Error()
     }
     model_cliente.update({nome:nome,endereco:endereco,telefone:telefone},{where:{id:id}})
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

router.delete('/', async(req,res)=>{
  try{
     const {id} =  req.body  
     await model_cliente.destroy({where:{id:id}})
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router