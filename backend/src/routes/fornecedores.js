const express = require("express")
const router = express.Router()
const model_fornecedor = require("../models/fornecedor");
const {v4:uuidv4}= require("uuid")

router.get('/',async(req,res)=>{

    try{
        const {cnpj} = req.body
        if(!cnpj){
            let lista_fornecedores = await model_fornecedor.findAll();
            res.send(lista_fornecedores)
        }
        else{
            let fornecedor = await model_fornecedor.findByPk(cnpj)
            res.send(fornecedor)
        }
    }
    catch(err){
        console.log(err)
        res.send(500,"Erro interno do servidor")
    }
    
})

router.post('/', async(req,res)=>{
    let fornecedor;
    try{
        const {nome,cnpj,telefone} =  req.body
        if(!cnpj || !nome){
            throw new Error();
        }
       let fornecedor = {nome,cnpj,telefone}   
        await model_fornecedor.create(fornecedor)
        fornecedor = await model_fornecedor.findByPk(cnpj)
        res.status(200).send(fornecedor)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {cnpj, nome,telefone} =  req.body
     let fornecedor = await model_fornecedor.findByPk(cnpj)
     if(!cnpj){
        throw new Error()
     }  
     else if(!fornecedor){
      throw new Error()
     }
     await model_fornecedor.update({nome:nome,telefone:telefone},{where:{cnpj:cnpj}})
     fornecedor = await model_fornecedor.findByPk(cnpj)
     res.status(200).send(fornecedor)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

router.delete('/', async(req,res)=>{
  try{
     const {cnpj} =  req.body
     let fornecedor = await model_fornecedor.findByPk(cnpj)
     if(!cnpj){
        throw new Error();
     }
     else if(!fornecedor){
        throw new Error()
     }
     await model_fornecedor.destroy({where:{cnpj:cnpj}})
    res.status(200).send(fornecedor)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router