'use strict';
 const Pessoa = require('../models/Pessoa');
 const ValidationContract = require("../validator/fluent-validators");
module.exports = {
    async store(req,res){
       
            try{
        
            let contract = new ValidationContract();
            contract.isRequired(req.body.cpf, 'cep', 'O Cep é obrigatorio');
            contract.isValue(req.body.cpf, 'cpf', 'O cpf já existe');
            contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
            contract.isRequired(req.body.cep, 'cep', 'O cep é obrigatorio');
            contract.isRequired(req.body.numero, 'numero', 'O cep é obrigatorio');
            contract.isRequired(req.body.sexo, 'sexo', 'O Sexo é obrigatorio');
            
           
            
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };
            req.body.chefe="S";
            const pessoa = await Pessoa.create(req.body); 

            return res.status(201).json({
                msg:"Familia cadastrado com sucesso",
                data:pessoa

            })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },

   

    
}