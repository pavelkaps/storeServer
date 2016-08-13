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
 * GET one booklist.
 */
router.get('/booklist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('booklist');
    var idbook = req.params.id;
    collection.find({ '_id' : idbook },function(e,docs){
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
router.delete('/booklist/:id', function(req, res) {
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
 * GET one genrelist.
 */

router.get('/genrelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('genrelist');
    var idgenre = req.params.id;
    collection.find({ '_id' : idgenre },function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to genrelist.
 */
router.post('/addgenre', function(req, res) {
    var db = req.db;
    var collection = db.get('genrelist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to genrelist.
 */
router.delete('/genrelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('genrelist');
    var genreToDelete = req.params.id;
    collection.remove({ '_id' : genreToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
/*
 * PUT to genrelist.
 */
router.put('/genrelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('genrelist');
    var genre = req.body;
    var idgenre = req.params.id;
    collection.update({'_id': idgenre}, {$set: {"title" : genre.title, "books" : genre.books}}, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    
});

/*
 * GET all typelist.
 */

router.get('/typelist', function(req, res) {
    var db = req.db;
    var collection = db.get('typelist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET one typelist.
 */

router.get('/typelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('typelist');
    var idtype = req.params.id;
    collection.find({ '_id' : idtype },function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to typelist.
 */
router.post('/addtype', function(req, res) {
    var db = req.db;
    var collection = db.get('typelist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to typelist.
 */
router.delete('/typelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('typelist');
    var typeToDelete = req.params.id;
    collection.remove({ '_id' : typeToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
/*
 * PUT to typelist.
 */
router.put('/typelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('typelist');
    var type = req.body;
    var idtype = req.params.id;
    collection.update({'_id': idtype}, {$set: {"title" : type.title, "magazine" : type.magazine}}, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
    
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
 * GET one magazine in magazinelist.
 */
router.get('/magazinelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('magazinelist');
    var idmagazine = req.params.id;
    collection.find({ '_id' : idmagazine },function(e,docs){
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
router.delete('/magazinelist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('magazinelist');
    var magazineToDelete = req.params.id;
    collection.remove({ '_id' : magazineToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
