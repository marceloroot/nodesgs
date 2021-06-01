'use strict';
const moment = require('moment');
 const Entrega = require('../models/Entrega');
const Pessoa = require('../models/Pessoa');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
module.exports = {
    async store(req,res){
       
            try{
            const{id} = req.params;
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const data = await authService.decodeToken(token);
            var jaentregue = false;
        

            let contract = new ValidationContract();
            contract.isRequired(req.body.quantidade, 'quantidade', 'A quantidade é obrigatorio');
            contract.isRequired(req.body.beneficios_id, 'beneficios_id', 'O beneficio é obrigatorio');
            contract.isRequired(id, 'beneficio_id', 'A Familia é obrigatorio');
            
             //busca pessoa
             const pessoa = await Pessoa.findByPk(id,{include:[{association:"beneficios"},{association:"entregas"}]});

           
            

            
            // Se os dados forem inválidos
            if (!contract.isValid()) {
                return res.status(200).send({
                error:contract.errors()
                })
            };
           
              //Valida se a pessoa tem o beneficio
              const result = pessoa.beneficios.find(atv => atv.id == req.body.beneficios_id.toString());
            
            
             if(!result){
                return res.status(200).send({
                    error:{beneficios_id:["Familia não existe"]}
                })
           
             }
              
           
            if(!pessoa){
                return res.status(200).send({
                    error:{beneficios_id:["Familia não existe"]}
                })
            }else if(pessoa.chefe != "S"){
                return res.status(200).send({
                    error:{beneficios_id:["Não é chefe de familia"]}
                })
            }
             
                const now = moment(new Date()); // Data de hoje
               // const past = moment("2021-05-31"); // Outra data no passado
               // const duration = moment.duration(now.diff(past));

                // Mostra a diferença em dias
               //  const days = duration.asDays();

            pessoa.entregas.map(entrega =>{
              let dia =  moment.duration(now.diff(entrega.datacadastro)).asDays();
              if(dia <= 30 && entrega.beneficios_id == req.body.beneficios_id ){
                 jaentregue = true;
              }
            })
           
           
           if(jaentregue){
            return res.status(201).json({
                error:{beneficios_id:["Já recebeu o benefício este mês"]},
                
            })
           }
            
            req.body.pessoas_id = pessoa.id; 
            req.body.usuario_id = data.id;  
            req.body.datacadastro = Date.now(); 
            req.body.equipamento_id = data.equipamento_id;
            const entrega = await Entrega.create(req.body); 

            return res.status(201).json({
                msg:"Emissão Efetuado com sucesso",
                data:pessoa

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
            const {id} = req.params;
            const entregas = await Entrega.findAll({
                where:{pessoas_id:id},
                include:[
                    {association:"pessoa",
                       attributes: [
                          'id','nome','cpf' // We had to list all attributes...
                  
                    ]},
                    {association:"equipamento",
                    attributes: [
                        'id','nome','responsavel' // We had to list all attributes...
                
                    ]},
                    {association:"beneficio",
                    attributes: [
                        'id','nome' // We had to list all attributes...
                
                    ]}
                
                ],
                order: [
                    ['datacadastro', 'DESC'],
                    
                ],
               
            });

            return res.status(201).send({
                entregas:entregas
            })
        }
        catch(err){
            res.status(200).send({
                error:err.message
            })
        }
    },

    async show(req,res){
        try{
            const {id} = req.params;
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const data = await authService.decodeToken(token);
            const entrega = await Entrega.findOne({
                where:{id:id},
                include:[
                    {association:"pessoa",
                       attributes: [
                          'id','nome','cpf','localidade','logradouro','uf','numero','bairro','telefone','status'// We had to list all attributes...
                  
                    ]},
                    {association:"equipamento",
                    attributes: [
                        'id','nome','responsavel' // We had to list all attributes...
                
                    ]},
                    {association:"beneficio",
                    attributes: [
                        'id','nome' // We had to list all attributes...
                
                    ]},
                    {association:"usuario",
                    attributes: [
                        'id','nome' // We had to list all attributes...
                
                    ]}
                
                ],

            });
          
            return res.status(201).send({
                entrega,data
            })
        }
        catch(err){
            res.status(200).send({
                error:err.message
            })
        }
    },

    async mudastatus(req,res){
        try{
            const {id} = req.params;
            const entrega = await Entrega.findByPk(id);
            if(!entrega){
                return res.status(200).send({
                    msg:'Entrega não existe'
                });
            }
            if(entrega.status == "A"){
                const entregaAtualizada = entrega.update({
                    status:"I"
                })
                return res.status(201).send({
                    msg:"Entrega Inativo",
                    
                })
            }
            else{
                const entregaAtualizada = entrega.update({
                    status:"A"
                })
                return res.status(201).send({
                    msg:"Entrega Ativo",
                    
                })
            }
           

        }
        catch(err){
            res.status(200).send({
                error:err.message
            })
        }
    },
}