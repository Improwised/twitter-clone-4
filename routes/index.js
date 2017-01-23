const express = require('express');

const DB = require('../helpers/db');

const router = express.Router();

// GET: /
router.get('/', (req, res, next) => {
  // Constuct and run a simple query
  const query = DB.builder()
    .select()
    .function('NOW()')
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }

    res.render('index', {
      title: `Time from the database is ${results.rows[0].now}`,
    });
  });
});
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const email = req.body.username;
  const password = req.body.password;
  const query = DB.builder()
    .select()
    .field('username')
    .from('registration')
    .where("email = ? AND password = ?", email, password)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    if(req.session.username === results.rows[0]){
      // res.redirect('/login', {
      console.log("sucess");
    }
      if(results.rowCount) {
     console.log(">>>>> found")
     sess = req.session;
     req.session.mail = email;
     console.log("---->>>", req.session.mail)
     console.log(".....session created")
     res.render('home');
   } else {
     console.log(">>>>> not found")
     res.render('index');
   }
  });
});
module.exports = router;
