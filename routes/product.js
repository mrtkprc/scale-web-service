const express = require('express');
const router = express.Router();

/* GET All Products. */
router.get('/all', function(req, res, next) {
    res.json({
        status:true
    });
});

module.exports = router;