const express = require('express');
const api = express.Router();
const Project = require('../models/Project');
const Financiers = require('../models/Financiers');
const Team = require('../models/Team');
const University = require('../models/University');

api.get('/', async (req, res) => {
  try {
    const projetos = await Project.find();
    const team = await Team.find();
    const university = await University.find();
    const financiers = await Financiers.find();

    res.json({ error: false, projetos, team, university, financiers });
  } catch (err) {
    res.json({ error: true, message: err.message })
  }
});

api.get('/projetos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projetos = await Project.find({ '_id': id });

    res.json({ error: false, projetos });

  } catch (err) {
    res.json({ error: true, message: err.message })
  }
});


module.exports = api;