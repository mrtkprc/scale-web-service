const express = require('express');
const db = require("../helpers/db");

const router = express.Router();

/* GET All Scales Informations */
router.get('/all', function(req, res, next) {
    const {auth_key} = req.decode;
    db.getData("SELECT * FROM kantartakip", auth_key)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.get('/transactions/:starting_date/:ending_date', function(req, res, next) {
    const {auth_key} = req.decode;
    const escapeCharacters = [req.params.starting_date, req.params.ending_date];
    console.log("starting date: ", escapeCharacters[0], " endin date: ", escapeCharacters[1]);
    db.getData("SELECT * FROM kantartakip where gelistarihi BETWEEN ? AND ?", auth_key
    , escapeCharacters)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});


module.exports = router;