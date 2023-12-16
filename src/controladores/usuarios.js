const knex = require('../../conexao');


const listar = async (req, res) => {

    try {
        const usuarios = await knex('usuarios');
        return res.status(200).json(usuarios);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterUsuarios = async (req, res) => {
    const { id } = req.params; 

try {

   const usuario = await knex('usuarios').where({id}).first();
   
       
         if (!usuario) {
            return res.status(404).json('Usuário nao encontrado')
         }

    return res.status(200).json(usuario);
} catch (error) {
    return res.status(400).json(error.message);
}

}


const cadastrarUsuarios = async (req, res) => {
    const { email, senha, nome } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' });
    }

    try {
        // VALIDAÇÃO PARA EMAIL DO USUARIO
        const emailUsuarioExiste = await knex('usuarios').where('email', email).first();

        if (emailUsuarioExiste) {
            return res.status(400).json({ mensagem: 'Este e-mail já existe' });
        }

        const [usuarioId] = await knex('usuarios').insert({ email, senha, nome });

        if (!usuarioId) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });
        }

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuarioId });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Usuario Criado com Sucesso' });
    }
};

const atualizar = async(req, res) => {
    const {nome , email, senha} = req.body;
    const { id } = req.params;



    try {
        const usuarioExiste = await knex('usuarios').where({id}).first();

        if (!usuarioExiste) {
            return res.status(404).json('Usuario não encontrado')
        }

        const usuario = await knex('usuarios')
        .update({ nome, senha, email})
        .where({id})


          if (!usuario) {
            return res.status(404).json({mensagem: 'Não foi possivel atualizar o usuário'})
          }

          return res.status(200).json("Usuario atualizado")

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const excluir = async (req, res) => {
    const { id } = req.params; 

    try {
        const usuarioExiste = await knex('usuarios').where({id}).first();

        if(!usuarioExiste) {
            return res.status(404).json({mensagem: 'Usuario não encontrado'});
        }

        const usuario = await knex('usuarios')
        .del()
        .where({ id });

        if (!usuario) {
            return res.status(400).json('Não foi possivel excluir o usuario')
        }

        return res.status(400).json('Excluido')

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    listar,
    obterUsuarios,
    cadastrarUsuarios,
    atualizar,
    excluir,
};