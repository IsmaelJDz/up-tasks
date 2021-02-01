const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const proyectosController = require('../controllers/proyectosController');

module.exports = function () {
  router.get('/', proyectosController.proyectosHome);
  router.get('/new-project', proyectosController.newProjects);
  router.post(
    '/new-project',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.newProject
  );
  //Listar proyecto
  router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

  //update project
  router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
  router.post(
    '/new-project/:id',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  return router;
};
