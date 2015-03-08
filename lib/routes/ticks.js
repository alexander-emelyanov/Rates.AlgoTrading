var express = require('express');
var router = express.Router();
var db = require('pg-db')();

/* GET ticks listing. */
router.get('/', function(req, res) {
    // console.log('Ticks router...');
    // res.send('respond with a resource');
    db.query('SELECT * FROM tick', function(err, rows){
        if( err ) {
            console.error(err);
            res.status(500).send('Data extracting failed...');
        }
        res.json(rows);
    });
});

module.exports = router;