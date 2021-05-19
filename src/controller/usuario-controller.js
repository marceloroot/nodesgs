'use strict';
 const Usuario = require('../models/Usuario');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const md5 = require('md5');
module.exports = {
    async store(req,res){
         
            try{
            const {nome,senha,email,telefone,equipamento_id} = req.body;
            const usuarioExist = await Usuario.findOne({where:{email:email}});
            let contract = new ValidationContract();
            contract.isRequired(nome, 'nome', 'O Cep é obrigatorio');
            contract.isRequired(senha, 'senha', 'A senha é obrigatorio');
            contract.isRequired(email, 'email', 'O email é obrigatorio');
            contract.isRequired(equipamento_id, 'equipamento_id', 'O Equipamento é obrigatorio');
            contract.isValue(usuarioExist, 'email', 'O email é já existe');
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };

            const senhaNova =  md5(req.body.senha + process.env.APP_SECRET_KEY);
            const usuario = await Usuario.create({
                nome,
                senha:senhaNova,
                email,
                equipamento_id,
                telefone  
            }); 

            return res.status(201).json({
                msg:"Usuario cadastrado com sucesso",
                data:usuario

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
            const {id} = req.params;
        const {nome,email,telefone,equipamento_id} = req.body;
       
       
        let contract = new ValidationContract();


      
        const usuarioExist  = await Usuario.findOne({where:{email:email}});
        const usuarioExist2  = await Usuario.findOne({where:{id:id}});
        contract.isRequired(nome, 'nome', 'O Cep é obrigatorio');
        contract.isRequired(email, 'email', 'O email é obrigatorio');
        contract.isRequired(equipamento_id, 'equipamento_id', 'O Equipamento é obrigatorio');
        contract.isEmailUpdade(usuarioExist,usuarioExist2, 'email', 'O email  já existe');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
       
        const usuarioold = await Usuario.findByPk(id);
        if(!usuarioold){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

       
        const usuario = await usuarioold.update({
            nome,
            email,
            equipamento_id,
            telefone ,
            
        }); 

        return res.status(201).json({
            msg:"Usuario Atualizado com sucesso",
            data:usuario

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
          
           const usuario = await Usuario.findByPk(id);
           return res.status(201).send({
               usuario:usuario
           })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }
   
    },

    async autenticar(req,res){
        try{
            const user = await Usuario.findOne({
                where:{
                    email:req.body.email,
                    senha:md5(req.body.password + process.env.APP_SECRET_KEY)
                }
            });

            const t = md5(req.body.password + process.env.APP_SECRET_KEY)
            console.log(t);
    
           
    
              if(!user){
                res.status(400).send({
                    error:'Email ou senha errada'
                });
               }
          
           const token = await authService.generateToken({
                id: user.id,
                email: user.email,
                nome: user.nome
            });

        res.status(201).send({
            access_token: token,
                data: {
                    email: user.email,
                    nome: user.nome
                 }
        });

        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }
    },

    async decoude(req,res){
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
    
        res.status(201).send({
            token: data,
                
        });
    },
   
}

