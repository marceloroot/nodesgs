'use strict';
 const Pessoa = require('../models/Pessoa');
 const { sequelize } = require('../models/Pessoa');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 
module.exports = {
    async store(req,res){
       
            try{
                const token = req.body.token || req.query.token || req.headers['x-access-token'];
                const data = await authService.decodeToken(token);
            const {idchefe} = req.params;
           
           const chefe = await Pessoa.findByPk(idchefe);
          
           if(!chefe)
           {
            return res.status(200).send({
                error:"Familia não existe"
            })
           }
         
            req.body.cep = chefe.cep;
            req.body.logradouro = chefe.logradouro;
            req.body.complemento = chefe.complemento;
            req.body.bairro = chefe.bairro;
            req.body.localidade = chefe.localidade;
            req.body.numero = chefe.numero;
            req.body.uf = chefe.uf;
            req.body.usuario_id = data.id;

            let contract = new ValidationContract();
            if(req.body.cpf){
                const pessoaExist  = await Pessoa.findOne({where:{cpf:req.body.cpf}});
                contract.isValue(pessoaExist, 'cpf', 'O cpf já cadastrado');
                contract.isCpfValid(req.body.cpf, 'cpf', 'O cpf invalido');
            }
           
            contract.isRequired(req.body.cpf, 'cpf', 'O cpf é obrigatorio');
           
            contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
            contract.isRequired(req.body.logradouro, 'logradouro', 'O logradouro é obrigatorio');
            contract.isRequired(req.body.numero, 'numero', 'O Numero é obrigatorio');
            contract.isRequired(req.body.sexo, 'sexo', 'O Sexo é obrigatorio');
            
           
            
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };
            req.body.chefe="N";
            req.body.familiar_id=chefe.id;
            req.body.usuario_id = data.id;

            const pessoa = await Pessoa.create(req.body); 
            console.log(req.body);
            return res.status(201).json({
                msg:"Familar cadastrado com sucesso",
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
        const {idchefe} = req.params;
        const chefe = await Pessoa.findByPk(idchefe);
          
        if(!chefe)
        {
         return res.status(200).send({
             error:"Familia não existe"
         })
        }
        let contract = new ValidationContract();
        if(req.body.cpf){
            const pessoaExistid  = await Pessoa.findByPk(id);
            const pessoaExist  = await Pessoa.findOne({where:{cpf:req.body.cpf}});
            contract.isCpfUpdade(pessoaExist,pessoaExistid, 'cpf', 'O cpf já cadastrado');
            contract.isCpfValid(req.body.cpf, 'cpf', 'O cpf invalido');
            
        }

        
        
       
            req.body.cep = chefe.cep;
            req.body.logradouro = chefe.logradouro;
            req.body.complemento = chefe.complemento;
            req.body.bairro = chefe.bairro;
            req.body.localidade = chefe.localidade;
            req.body.numero = chefe.numero;
            req.body.uf = chefe.uf;

                  
        contract.isRequired(req.body.nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(req.body.numero, 'numero', 'O Numero é obrigatorio');
        contract.isRequired(req.body.sexo, 'sexo', 'O Sexo é obrigatorio');
        
       
        
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
        req.body.chefe="N";
        req.body.familiar_id=chefe.id;//aqui vai o relacionamento
        const pessoa = await Pessoa.findByPk(id);
        if(!pessoa){
            return res.status(201).json({
                msg:'Pessoa não existe',
            })
        }

        const pessoaold = await pessoa.update(req.body); 

        return res.status(201).json({
            msg:"Familiar atualizado com sucesso",
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
           
            const pessoaUse = await Pessoa.findByPk(id);
            return res.status(201).send({
                responsavel:pessoaUse
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
            const { id } = req.params;
            const pessoas = await Pessoa.findAll({
                where:sequelize.and({familiar_id:id},{chefe:"N"})
            });
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

   

    
}