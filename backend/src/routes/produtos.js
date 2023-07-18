const express = require("express")
const router = express.Router()
const model_produto = require("../models/produto");
const {v4:uuidv4}= require("uuid");
const cliente = require("../models/cliente");

router.get('/',async(req,res)=>{

    try{
        const {id} = req.body
        if(!id){
            let lista_produtos = await model_produto.findAll();
            res.send(lista_produtos)
        }
        else{
            let produto = await model_produto.findByPk(id)
            res.send(produto)
        }
    }
    catch(err){
        console.log(err)
        res.send(500,"Erro interno do servidor")
    }
})

router.post('/', async(req,res)=>{
    let produto;
    try{
       const {sabor,preco,tipo,lucro} =  req.body
       const id = uuidv4()
       if(lucro == null){
        produto = {sabor,preco,tipo,id} 
       }
       else{
        produto = {sabor,preco,tipo,id,lucro} 
       }
        produto = await model_produto.findByPk(id)
        await model_produto.create(produto)
        res.status(200).send(produto)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {sabor,preco,tipo,id,lucro}  =  req.body 
     let produto = model_produto.findByPk(id)
     if(!id){
        throw new Error()
     }
     if(!produto){
      throw new Error()
     }
     await model_produto.update({sabor:sabor,preco:preco,tipo:tipo,lucro:lucro},{where:{id:id}})
     produto = await model_produto.findByPk(id)
     res.status(200).send(produto)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

router.delete('/', async(req,res)=>{
  try{
     const {id} =  req.body  
     let produto = await model_produto.findByPk(id)
     if(!id){
        throw new Error()
     }
     else if(!cliente){
        throw new Error()
     }
     await model_produto.destroy({where:{id:id}})
    res.status(200).send(produto)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router