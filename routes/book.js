const express = require("express");
const bookModel = require("../model/books.js");

const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  bookModel
    .find({})
    .then((books) => {
      res.status(200);
      res.send(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send(err.message);
    });
});

bookRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  bookModel
    .findById(id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

bookRouter.post("/", (req, res) => {
  const book = req.body;
  book.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  bookModel
    .create(book)
    .then((book) => {
      res.status(201).send({
        message: "Book added successfully",
        data: book,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

bookRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const book = req.body;
  book.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  bookModel
    .findByIdAndUpdate(id, book, { new: true })
    .then((newBook) => {
      res.status(200).send(newBook);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

bookRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  bookModel
    .findByIdAndRemove(id)
    .then((book) => {
      res.status(200).send({
        message: "Deletion is successful",
        data: "book",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = bookRouter;
