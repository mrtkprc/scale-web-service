const express = require('express');
const db = require("../helpers/db");

const router = express.Router();

/* GET All Scales Informations */
router.get('/all', function(req, res, next) {
    const {dbName} = req.decode;
    db.getData("SELECT * FROM kantartakip", dbName)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.get('/transactions/:starting_date/:ending_date', function(req, res, next) {
    const {dbName} = req.decode;
    const escapeCharacters = [req.params.starting_date, req.params.ending_date];
    db.getData("SELECT * FROM kantartakip where gelistarihi BETWEEN ? AND ?", dbName, escapeCharacters)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});


module.exports = router;