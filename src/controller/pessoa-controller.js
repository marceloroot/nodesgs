'use strict';
 const Pessoa = require('../models/Pessoa');
 const { sequelize } = require('../models/Pessoa');
 const ValidationContract = require("../validator/fluent-validators");
const { show } = require('./equipamento-controller');
const authService = require('../services/auth-services');
module.exports = {
    async store(req,res){
       
            try{
                const token = req.body.token || req.query.token || req.headers['x-access-token'];
                const data = await authService.decodeToken(token);

            
            let contract = new ValidationContract();
            if(req.body.cpf){
                const pessoaExist  = await Pessoa.findOne({where:{cpf:req.body.cpf}});
                contract.isValue(pessoaExist, 'cpf', 'O cpf já existe');
                contract.isCpfValid(req.body.cpf, 'cpf', 'O cpf invalido');
            }
            if(req.body.cep){
                const enderecoExiste = await Pessoa.findOne({
                    where:sequelize.and({cep:req.body.cep},{numero:req.body.numero})
                });
                contract.isValue(enderecoExiste, 'cep', 'endereco já existe');
            }
            contract.isRequired(req.body.cpf, 'cpf', 'O cpf é obrigatorio');
           
            contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
            contract.isRequired(req.body.cep, 'cep', 'O Cep é obrigatorio');
            contract.isRequired(req.body.logradouro, 'logradouro', 'O logradouro é obrigatorio');
            contract.isRequired(req.body.numero, 'numero', 'O Numero é obrigatorio');
            contract.isRequired(req.body.sexo, 'sexo', 'O Sexo é obrigatorio');
            
           
            
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };
            req.body.chefe="S";
            req.body.usuario_id = data.id;
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

    async update(req,res){
       
        try{
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const data = await authService.decodeToken(token);
        const { id } = req.params;
        let contract = new ValidationContract();
        if(req.body.cpf){
            const pessoaExistid  = await Pessoa.findByPk(id);
            const pessoaExist  = await Pessoa.findOne({where:{cpf:req.body.cpf}});
            contract.isCpfUpdade(pessoaExist,pessoaExistid, 'cpf', 'O cpf já existe');
            contract.isCpfValid(req.body.cpf, 'cpf', 'O cpf invalido');
            
        }

        if(req.body.cep){
            const enderecoExiste = await Pessoa.findOne({
                where:sequelize.and({cep:req.body.cep},{numero:req.body.numero})
            });
            
            contract.isEnderecoUpdade(enderecoExiste,req.body.id, 'cep', 'endereco já existe');
        }
        
       
       
       
        contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(req.body.cep, 'cep', 'O Cep é obrigatorio');
        contract.isRequired(req.body.numero, 'numero', 'O Numero é obrigatorio');
        contract.isRequired(req.body.sexo, 'sexo', 'O Sexo é obrigatorio');
        
       
        
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
        req.body.chefe="S";
        req.body.usuario_id = data.id;
        const pessoa = await Pessoa.findByPk(id);
        if(!pessoa){
            return res.status(201).json({
                msg:'Pessoa não existe',
            })
        }

        const pessoaold = await pessoa.update(req.body); 

        return res.status(201).json({
            msg:"Familia atualizado com sucesso",
            data:pessoaold

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
           
            const pessoa = await Pessoa.findByPk(id);
            return res.status(201).send({
                pessoa:pessoa
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
            const pessoas = await Pessoa.findAll({where:{chefe:"S"}});
            return res.status(201).send({
                pessoas:pessoas
            })
        }
        catch(err){
            res.status(200).send({
                error:err.message
            })
        }
    },
    async showBeneficios(req,res){
        try{
            const { id } = req.params;
            const pessoa = await Pessoa.findByPk(id,{include:{association:"beneficios"}});
            return res.status(201).send({
                pessoa:pessoa
            })
        }
        catch(err){
            res.status(201).send({
                error:err.message
            })
        }
    }

   

    
}