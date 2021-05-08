var express = require('express');
var router = express.Router();
const redis =  require('redis');


const client = redis.createClient();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/search', function(req, res, next) {
  let id = req.body.id;

  client.hgetall(id, function(err, obj){
    if(!obj){
      res.render('index', {
        error: 'User does not exist.'
      });
    } else {
      obj.id = id;
      res.render('details', {
        user:obj
      });
    }
  });
});
router.get('/add', function(req, res, next){
  res.render('addUser')
});
router.post('/add', function(req, res, next){

  const { id, email, first_name, last_name, phone } = req.body;

  client.hmset(id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], function(err, reply) {
    if (err) {
      console.log(err)
    } else {
      console.log(reply)
      res.redirect('/');
    }
  })
});

router.delete('/delete/:id', function (req, res, next ) {
  client.del(req.params.id);
  res.redirect('/');
})
module.exports = router;
