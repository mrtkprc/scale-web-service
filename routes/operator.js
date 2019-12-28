const express = require('express');
const db = require("../helpers/db");
const router = express.Router();

/* GET All Operators. */
router.get('/all', function(req, res, next) {
    const {auth_key} = req.decode;
    db.getData("SELECT * FROM operatorkayit", auth_key)
        .then(data => res.json(data))
        .catch(err => res.json(err));

});

module.exports = router;