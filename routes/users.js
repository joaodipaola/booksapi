const express = require('express');
const router = express.Router();
const db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.findBooks());
})

router.get('/:id', (request, response) => {
  const id = request.params.id;
  response.json(db.findBooks(id));
})

router.post('/', (request, response) => {
  const book = db.insertBook(request.body);
  response.status(201).json(book);
})

router.put('/:id', (request, response) => {
  const id = request.params.id;
  const book = db.updateBook(id, request.body, true);
  response.status(200).json(book);
})

router.patch('/:id', (request, response) => {
  const id = request.params.id;
  const book = db.updateBook(id, request.body, false);
  response.status(200).json(book);
})

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  db.deleteBook(id);
  response.status(200).json({});
})

module.exports = router;
