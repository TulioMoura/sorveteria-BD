const express = require("express")
const router = express.Router()
const model_fornecedor = require("../models/fornecedor");
const {v4:uuidv4}= require("uuid")

router.get('/',async(req,res)=>{
    let lista_fornecedores = await model_fornecedor.findAll();
    res.send(lista_fornecedores)
})

router.post('/', async(req,res)=>{
    let fornecedor;
    try{
       const {nome,cnpj,telefone} =  req.body
       fornecedor = {nome,cnpj,telefone}            
        await model_fornecedor.create(fornecedor)
        res.send(200)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {cnpj, nome,telefone} =  req.body  
     if(!model_fornecedor.findByPk(cnpj)){
      throw new Error()
     }
     model_fornecedor.update({nome:nome,telefone:telefone},{where:{id:id}})
     res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

router.delete('/', async(req,res)=>{
  try{
     const {cnpj} =  req.body  
     await model_fornecedor.destroy({where:{cnpj:cnpj}})
    res.send(200)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router