'use strict';
 const Beneficio = require('../models/Beneficio');
const Pessoa = require('../models/Pessoa');
 const ValidationContract = require("../validator/fluent-validators");
module.exports = {
    async store(req,res){
       
            try{
        
            let contract = new ValidationContract();
            contract.isRequired(req.body.nome, 'nome', 'O Cep é obrigatorio');
       
            
            
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };

            const beneficio = await Beneficio.create(req.body); 

            return res.status(201).json({
                msg:"Beneficio cadastrado com sucesso",
                data:beneficio

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
        contract.isRequired(req.body.nome, 'nome', 'O Cep é obrigatorio');
        
        
        
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
        const beneficio = await Beneficio.findByPk(id);
        if(!beneficio){
            return res.status(201).json({
                msg:'Beneficio não existe',
               
            })
        }

        const beneficioAtualizado = await beneficio.update(req.body); 

        return res.status(201).json({
            msg:"Beneficio Atualizado com sucesso",
            data:beneficioAtualizado

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
       
        const beneficio = await Beneficio.findByPk(id);
        return res.status(201).send({
            beneficio:beneficio
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
            const beneficios = await Beneficio.findAll();
            return res.status(201).send({
                beneficios:beneficios
            })
        }
        catch(err){
            res.status(201).send({
                error:err.message
            })
        }
    },

    async linkPessoa(req,res){
        try{
            const{id,pessoaid} = req.params;
            const beneficio = await Beneficio.findByPk(id);
            if(!beneficio){
                return res.status(200).send({
                    msg:'Beneficio não existe'
                })
            }
            const pessoa = await Pessoa.findByPk(pessoaid,{include:{association:"beneficios"}});
            const result = pessoa.beneficios.find(atv => atv.id == id.toString());
            if(pessoa.chefe != "S"){
                return res.status(200).send({
                    msg:'Esse não é Chefe da Familia'
                })
            }
            if(result){
             
                pessoa.removeBeneficios(beneficio);
            }
            else{
                pessoa.addBeneficios(beneficio);
            }
            return res.status(201).json({
                msg:'Atualizado com sucesso',
                data:result,
            })
    
        }
        catch(err){
            res.status(200).send({
                error:err.message
            })
        }
    }
    
  
}