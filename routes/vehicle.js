const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/all_vehicles', function(req, res, next) {
    res.json({
        adamin:"Serkan",
        dibi:"Kaya"
    });
});

module.exports = router;