const { criarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const usuarioModel = require('../models/usuariosModel.js');

async function criar(req,res){
    try{
        const senhaCriada = criarSenha(req.body.senha);
        const novoUsuario = await usuarioModel.create({
            email: req.body.email,
            senha: senhaCriada
        });
        return res.status(201).json(novoUsuario);
    }catch(err){
        return res.status(422).json({msg:'Email e Senha são obrigatórios'});
    }
}

async function entrar(req,res){
    const usuarioEncontrado = await usuarioModel.findOne({email:req.body.usuario});
    if(usuarioEncontrado){
        const confere = compararSenha(req.body.senha,usuarioEncontrado.senha);
        if(confere){
            const token = gerarToken({email:req.body.usuario});
            return res.status(200).json({token: token});
        }else{
            return res.status(401).json({msg:'Credenciais inválidas'})
        }
    }else{
        return res.status(401).json({msg:'Credenciais inválidas'})
    }
}

async function renovar(req,res){
    const token = gerarToken({email:req.usuario});
    return res.status(200).json({token: token});
}

async function remover(req,res){
    const { id } = req.params;
    const usuarioEncontrado = await usuarioModel.findOneAndDelete({_id:id});
    return res.status(204).json({});
}

module.exports = { criar, entrar, renovar, remover };