const VirtualShelf = require("../models/virtualShelf");
const { Op } = require("sequelize");
const Book = require("../models/book");
const router = require("express").Router();

router
    .route("/virtualShelf")
    .get(async(req, res) => {
        try {
            const { filterDescriere } = req.query;
            const { filterData } = req.query;
            const { sortBy } = req.query;
            if (filterDescriere && filterData) {
                const virtualShelf = await VirtualShelf.findAll({
                    where: {
                        data: {
                            [Op.eq]: filterData
                        },
                        descriere: {
                            [Op.eq]: filterDescriere
                        }
                    },
                    attributes: ["id", "descriere", "data"],
                    order: sortBy ? [
                        [sortBy, "ASC"]
                    ] : undefined
                });
                return res.status(200).json(virtualShelf);
            } else {
                const virtualShelf = await VirtualShelf.findAll();
                return res.status(200).json(virtualShelf);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    .post(async(req, res) => {
        try {
            const newVirtualShelf = await VirtualShelf.create(req.body);
            return res.status(200).json(newVirtualShelf);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

router
    .route("/virtualShelf/:id")
    .get(async(req, res) => {
        try {
            const virtualShelf = await VirtualShelf.findByPk(req.params.id);
            if (virtualShelf) {
                return res.status(200).json(virtualShelf);
            } else {
                return res.status(404).json({ error: `Shelf with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async(req, res) => {
        try {
            const virtualShelf = await VirtualShelf.findByPk(req.params.id);
            if (virtualShelf) {
                const updateVirtualShelf = await virtualShelf.update(req.body);
                return res.status(200).json(updateVirtualShelf);
            } else {
                return res.status(404).json({ error: `Shelf with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async(req, res) => {
        try {
            const virtualShelf = await VirtualShelf.findByPk(req.params.id);
            if (virtualShelf) {
                const deleteVirtualShelf = await virtualShelf.destroy();
                return res.status(200).json(deleteVirtualShelf);
            } else {
                return res.status(404).json({ error: `Shelf with id ${req.params.id} not found!` });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    
router
    .route("/import")
    .post(async(req, res, next) => {
        try {
            for (let j of req.body) {
                const virtualShelf = await VirtualShelf.create(v);
                for (let b of v.book) {
                    const book = await Book.create(b);
                    virtualShelf.addBook(book);
                }
                await virtualShelf.save();
            }
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    })


router
    .route("/export")
    .get(async(req, res, next) => {
        try {
            let exp = [];
            const virtualShelf = await VirtualShelf.findAll();
            for (let v of virtualShelf) {
                const virtualShelf = {
                    descriere: v.descriere,
                    data: v.data,
                    Book: []
                }

                for (let b of await v.getVirtualShelf()) {
                    virtualShelf.Book.push({
                        titlu: b.titlu,
                        gen: b.gen,
                        url: b.url
                    });
                }
                exp.push(virtualShelf);
            }
            if (exp.length > 0) {
                res.json({ export: exp });
            } else {
                res.sendStatus(204);
            }
        } catch (err) {
            next(err);
        }
    })
module.exports = router;


