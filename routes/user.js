const express = require('express');
const db = require("../helpers/db");
const md5 = require('md5');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

/* GET User Login Checking. */
router.get('/checkLoginOperation', function(req, res, next) {
    const {email, password} = req.decode;

    db.getData("SELECT id, db_name, email, password FROM login_informations WHERE email=? and password=?",
        process.env.USER_REGISTRY_DB_NAME,
        [email, md5(password)])
            .then(data => data.data)
            .then(data => {
                if(data.length === 1){
                    jwt.sign({ auth_key: data[0].db_name }, process.env.JWT_SECRET_KEY, { algorithm: 'HS256' }, (err, token) => {
                        if(err){
                            res.json({error:"Giriş İşlemi Başarısız"})
                        }
                        else
                        {
                            res.json({auth_key: token, error:""})
                        }
                    })
                }else{
                    res.json({error:"Giriş İşlemi Başarısız"})
                }
            })
            .catch((error) => res.json(error));
});

module.exports = router;