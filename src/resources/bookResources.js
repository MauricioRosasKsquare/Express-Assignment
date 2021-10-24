// Modules
const express = require('express');
const BookResources = express.Router();

// Controllers
const { BookControllers } = require('../controllers');

// Middlewares

const { Middlewares } = require('../middlewares');

// All book resources
BookResources.get('/', BookControllers.getAll);
BookResources.post('/', Middlewares.authorValidator, Middlewares.yearValidator, Middlewares.duplicated, BookControllers.createBook);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', Middlewares.authorValidator, Middlewares.yearValidator, Middlewares.duplicated, BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;


