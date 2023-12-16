const express = require('express');
const usuarios = require('./src/controladores/usuarios')


const rotas = express();


rotas.get('/usuarios' , usuarios.listar);
rotas.get('/usuarios/:id' , usuarios.obterUsuarios);
rotas.post('/usuarios' , usuarios.cadastrarUsuarios);
rotas.put('/usuarios/:id' , usuarios.atualizar);
rotas.delete('/usuarios/:id' , usuarios.excluir);

module.exports = rotas;