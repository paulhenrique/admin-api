const express = require('express');
const api = express.Router();
const Project = require('../models/Project');

api.get('/', async (req, res) => {
  try {
    const projetos = await Project.find();
    res.json({ error: false, projetos });
  } catch (err) {
    res.json({ error: true, message: err.message })
  }
});

api.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projetos = await Project.find({ '_id': id });

    res.json({ error: false, projetos });

  } catch (err) {
    res.json({ error: true, message: err.message })
  }
});

module.exports = api;