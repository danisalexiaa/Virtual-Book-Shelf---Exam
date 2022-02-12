const Book = require("../models/book");
const VirtualShelf = require("../models/virtualShelf");

const router = require("express").Router();
let genuri = ["COMEDY", "TRAGEDY", "HORROR"];

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

router
  .route("/book")
  .get(async (req, res) => {
    try {
      const book = await Book.findAll();
      return res.status(200).json(book);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      if (genuri.indexOf(req.body.gen) >= 0) {
        if (isValidHttpUrl(req.body.url)) {
          const newBook = await Book.create(req.body);
          return res.status(200).json(newBook);
        } else {
          res.status(404).json({ message: "URL invalid" });
        }
      } else {
        return res.status(404).json({ message: "Genul nu este valid!" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

router
  .route("/book/:id")
  .get(async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        return res.status(200).json(book);
      } else {
        return res
          .status(404)
          .json({ error: `Book with id ${req.params.id} not found!` });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        const updateBook = await book.update(req.body);
        return res.status(200).json(updateBook);
      } else {
        return res
          .status(404)
          .json({ error: `Book with id ${req.params.id} not found!` });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        const deleteBook = await book.destroy();
        return res.status(200).json(deleteBook);
      } else {
        return res
          .status(404)
          .json({ error: `Book with id ${req.params.id} not found!` });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

router
  .route("/virtualShelf/:virtualShelfId/book")
  .post(async (req, res, next) => {
    try {
      const virtualShelf = await VirtualShelf.findByPk(req.params.virtualShelfId);
      if (virtualShelf) {
        if (genuri.indexOf(req.body.gen) >= 0) {
          if (isValidHttpUrl(req.body.url)) {
            const book = new Book(req.body);
            book.VirtualShelfId = virtualShelf.id;
            console.log(book);
            await book.save();
            res.status(201).json({ message: "Book created!" });
          } else {
              res.status(404).json({message:"URL invalid!"})
          }
        } else {
          res.status(404).json({ message: "Genul nu este valid!" });
        }
      } else {
        res.status(404).json({ message: "404 - Shelf not found!" });
      }
    } catch (err) {
      next(err);
    }
  })
  .get(async (req, res, next) => {
    try {
      const virtualShelf = await VirtualShelf.findByPk(
        req.params.virtualShelfId,
        {
          include: [Book],
        }
      );
      if (virtualShelf) {
        res.status(200).json(virtualShelf.book);
      } else {
        res.status(404).json({ message: "404 - Shelf not found!" });
      }
    } catch (err) {
      next(err);
    }
  });

// Update si Delete entitate copil
router
  .route("/virtualShelf/:virtualShelfId/book/:bookId")
  .put(async (req, res, next) => {
    try {
      const virtualShelf = await VirtualShelf.findByPk(
        req.params.virtualShelfId
      );
      if (virtualShelf) {
        const book = await virtualShelf.getBooks({
          id: req.params.candidateID,
        });
        book1 = null;
        for (b of book) {
          if (b.id == req.params.bookId) {
            book1 = b;
          }
        }
        // const book = book.shift();
        if (book1) {
          book1.titlu = req.body.titlu;
          book1.gen = req.body.gen;
          book1.url = req.body.url;
          await book1.save();
          res.status(202).json({ message: `Book ${book1.id} updated!` });
        } else {
          res.status(404).json({ message: "404 - Book not found!" });
        }
      } else {
        res.status(404).json({ message: "404 - Shelf not found!" });
      }
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const virtualShelf = await VirtualShelf.findByPk(
        req.params.virtualShelfId
      );
      if (virtualShelf) {
        const book = await virtualShelf.getBooks({ id: req.params.bookId });
        book1 = null;
        for (b of book) {
          if (b.id == req.params.bookId) {
            book1 = b;
          }
        }
        // const book = book.shift();
        if (book1) {
          await book1.destroy();
          res.status(202).json({ message: "Book deleted!" });
        } else {
          res.status(404).json({ message: "404 - Book not found!" });
        }
      } else {
        res.status(404).json({ message: "404 - Shelf not found!" });
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
