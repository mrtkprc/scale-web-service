const express = require('express');
const db = require("../helpers/db");

const router = express.Router();

/* GET All Products. */
router.get('/all', function(req, res, next) {
    const {dbName} = req.decode;
    db.getData("SELECT * FROM urunkayit", dbName).then(data => res.json(data));
});

module.exports = router;