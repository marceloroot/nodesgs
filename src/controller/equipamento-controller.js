'use strict';
 const Equipamento = require('../models/Equipamento');
 const ValidationContract = require("../validator/fluent-validators");
module.exports = {
    async store(req,res){
       
            try{
        
            let contract = new ValidationContract();
            contract.isRequired(req.body.cep, 'cep', 'O Cep é obrigatorio');
            contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
            contract.isRequired(req.body.numero, 'numero', 'O numero é obrigatorio');
            
            
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };

            const equipamento = await Equipamento.create(req.body); 

            return res.status(201).json({
                msg:"Equipamento cadastrado com sucesso",
                data:equipamento

            })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },

    async update(req,res){
       
        try{
        const { id } = req.params;
        let contract = new ValidationContract();
        contract.isRequired(req.body.cep, 'cep', 'O Cep é obrigatorio');
        contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(req.body.numero, 'numero', 'O numero é obrigatorio');
        
        
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
        const equipamento = await Equipamento.findByPk(id);
        if(!equipamento){
            return res.status(201).json({
                msg:'Equipamento não existe',
               
            })
        }

        const equipamentoAtualizado = await equipamento.update(req.body); 

        return res.status(201).json({
            msg:"Equipamento Atualizado com sucesso",
            data:equipamentoAtualizado

        })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

    },

    async show(req,res){
     try{
        const { id } = req.params;
       
        const equipamento = await Equipamento.findByPk(id);
        return res.status(201).send({
            equipamento:equipamento
        })
     }
     catch(err){
         return res.status(200).send({
             error:err.message
         })
     }

    },

    async index(req,res){
        try{
            const equipamentos = await Equipamento.findAll();
            return res.status(201).send({
                equipamentos:equipamentos
            })
        }
        catch(err){
            res.status(200).send({
                error:err.message
            })
        }
    },

    
}