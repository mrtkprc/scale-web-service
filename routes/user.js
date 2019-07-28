const express = require('express');
const db = require("../helpers/db");
const md5 = require('md5');
require('dotenv').config();

const router = express.Router();

/* GET User Login Checking. */
router.get('/checkLoginOperation', function(req, res, next) {
    const {email, password} = req.decode;

    db.getData("SELECT id, db_name, email, password FROM login_informations WHERE email=? and password=?",
        process.env.USER_REGISTRY_DB_NAME,
        [email, md5(password)])
            .then(data =>res.json(data))
            .catch((error) => res.json(error));
});

module.exports = router;