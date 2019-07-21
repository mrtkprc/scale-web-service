const express = require('express');
const db = require("../helpers/db");

const router = express.Router();

/* GET All companies.  */
router.get('/all', function(req, res, next) {
    const {dbName} = req.decode;

    db.getData("SELECT * FROM firmakayit", dbName)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = router;