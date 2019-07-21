const express = require('express');
const db = require("../helpers/db");

const router = express.Router();

/* GET All Vehicle Information. */
router.get('/all', function(req, res, next) {
    const {dbName} = req.decode;
    db.getData("SELECT * FROM arackayit", dbName)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = router;