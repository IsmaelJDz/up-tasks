const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render('index', {
    namePage: 'Projects',
    proyectos,
  });
};

exports.newProjects = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render('newProjects', {
    namePage: 'New project',
    proyectos,
  });
};

exports.newProject = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  const { nombre } = req.body;

  let errors = [];

  if (!nombre) {
    errors.push({ texto: 'Agrega un nombre al proyecto' });
  }

  if (errors.length > 0) {
    res.render('newProjects', {
      namePage: 'New project',
      errors,
      proyectos,
    });
  } else {
    // Insert Data

    await Proyectos.create({ nombre });
    res.redirect('/');
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  if (!proyecto) {
    return next();
  }

  //res.send('Ok 🟢');
  res.render('tareas', {
    namePage: 'Tareas del proyecto',
    proyectos,
    proyecto,
  });
};

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render('newProjects', {
    namePage: 'Editar proyecto',
    proyecto,
    proyectos,
  });
};

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  const { nombre } = req.body;

  let errors = [];

  if (!nombre) {
    errors.push({ texto: 'Agrega un nombre al proyecto' });
  }

  if (errors.length > 0) {
    res.render('newProjects', {
      namePage: 'New project',
      errors,
      proyectos,
    });
  } else {
    // Insert Data

    await Proyectos.update(
      { nombre: nombre },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect('/');
  }
};
