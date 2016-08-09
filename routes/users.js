var express = require('express');
var router = express.Router();

/*
 * GET booklist.
 */
router.get('/booklist', function(req, res) {
    var db = req.db;
    var collection = db.get('booklist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addbook.
 */
router.post('/addbook', function(req, res) {
    var db = req.db;
    var collection = db.get('booklist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletebook.
 */
router.delete('/deletebook/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('booklist');
    var bookToDelete = req.params.id;
    collection.remove({ '_id' : bookToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
/*
 * GET all genrelist.
 */

router.get('/genrelist', function(req, res) {
    var db = req.db;
    var collection = db.get('genrelist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * Add book_id to genrelist.
 */
router.put('/addbooktogenre/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('genrelist');
    var idgenre = req.params.id;
    var idbook = req.params.id;
    collection.update({"_id": "57a3295182daa18e270759b9" }, {$addToSet: {"books" : idbook}});
    
});

/*
 * GET magazinelist.
 */
router.get('/magazinelist', function(req, res) {
    var db = req.db;
    var collection = db.get('magazinelist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addmagazine.
 */
router.post('/addmagazine', function(req, res) {
    var db = req.db;
    var collection = db.get('magazinelist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletemagaine.
 */
router.delete('/deletemagazine/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('magazinelist');
    var magazineToDelete = req.params.id;
    collection.remove({ '_id' : magazineToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
