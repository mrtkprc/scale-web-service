const express = require('express');
const db = require("../helpers/db");

const router = express.Router();

/* GET All Scales Informations */
router.get('/all', function(req, res, next) {
    const {dbName} = req.decode;
    db.getData("SELECT * FROM kantartakip", dbName).then(data => res.json(data));
});

module.exports = router;