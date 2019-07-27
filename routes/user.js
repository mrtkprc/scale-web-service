const express = require('express');
const db = require("../helpers/db");
const md5 = require('md5');
require('dotenv').config();

const router = express.Router();

/* GET User Login Checking. */
router.get('/checkLoginOperation', function(req, res, next) {
    const {username, password} = req.decode;

    db.getData("SELECT id, db_name, username, password FROM login_informations WHERE username=? and password=?",
        process.env.USER_REGISTRY_DB_NAME,
        [username, md5(password)])
            .then(data =>res.json(data))
            .catch((error) => res.json(error));
});



module.exports = router;