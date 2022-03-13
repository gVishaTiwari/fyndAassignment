const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const moviesController = require('../controller/movies_controller');

router.get('/searchMovie/:search',moviesController.search);

router.post('/deleteMovie',moviesController.deleteMovie);

router.post('/adminedit',moviesController.adminEdit);
router.post('/create',moviesController.create);
router.get('/find/:id',moviesController.find);
router.get('/allMovies',moviesController.allMovies);


module.exports= router;