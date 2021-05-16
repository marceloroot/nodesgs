'use strict';
 const Endereco = require('../models/Endereco');
 const ValidationContract = require("../validator/fluent-validators");
module.exports = {
    async store(req,res){
       
        try{
         console.log(req.body)
        let contract = new ValidationContract();
        contract.isRequired(req.body.cep, 'cep', 'O Cep é obrigatorio');
         ///fazer validação para ver se não tem pessoa cadastrada nesse endereco.
         
         
          // Se os dados forem inválidos
          if (!contract.isValid()) {
            return res.status(200).send({
               error:contract.errors()
            })
        };

        const endereco = await Endereco.create(req.body); 

        return res.status(201).json({
            msg:"Endereco cadastrado com sucesso",
            data:"endereco"

        })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
         })
    }

    }
}