const express = require("express")
const router = express.Router()
const model_cliente = require("../models/cliente");
const {v4:uuidv4}= require("uuid")

router.get('/',async(req,res)=>{
  try{
    const id = req.query.id
        
    if(!id){
      let clientList = await model_cliente.findAll();
      res.send(clientList)
    }
    else{
        let cliente = await model_cliente.findByPk(id)
        res.send(cliente)
    }
}
catch(err){
    console.log(err)
    res.send(500,"Erro interno do servidor")
}

    
})

router.post('/', async(req,res)=>{
    let cliente;
    try{
       const {nome,endereco,telefone} =  req.body
      if(!nome){
        throw new Error();
      }

       let id = uuidv4()
       cliente = {nome,endereco,telefone,id}            
        await model_cliente.create(cliente)
        cliente = await model_cliente.findByPk(id);
        res.status(200).json(cliente)
    }
    catch(err){
        console.log(err)
        res.send(400,"Corpo da requisição inválida")
    }
    
})

router.patch('/', async(req,res)=>{
  try{
     const {id, nome, endereco, telefone} =  req.body  
     let cliente = await model_cliente.findByPk(id)
     if(!id){
      throw new Error()
     }
     else if(!cliente ){
      throw new Error()
     }
     await model_cliente.update({nome:nome,endereco:endereco,telefone:telefone},{where:{id:id}})
     cliente = await model_cliente.findByPk(id)
     res.status(200).send(cliente)
    
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

router.delete('/', async(req,res)=>{
  try{
     const {id} =  req.body  
     let cliente = await model_cliente.findByPk(id)
     if(!id){
      throw new Error();
     }
    else if(!cliente){
      throw new Error();
    }

    await model_cliente.destroy({where:{id:id}})
    res.status(200).send(cliente)
  }
  catch(err){
      console.log(err)
      res.send(400,"Corpo da requisição inválida")
  }
  
})

module.exports = router