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
      title: `reg ${results.rows[0].now}`,
    });
  });
});

router.get('/registration', (req, res, next) => {
  res.render('registration');
});

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/followers', (req, res, next) => {
  res.render('followers');
});

router.get('/following', (req, res, next) => {
  res.render('following');
});

router.post('/registration', (req, res, next) => {

  // Constuct and run a simple query
  const username=req.body.username;
  const password=req.body.password;
  const email=req.body.email;
  const mobile_number=req.body.mobile_number;
  // console.log(username, "----->>>>>")
  const query = DB.builder()
    .insert()
    .into("registration")
    .set("username", username)
    .set("password", password)
    .set("email", email)
    .set("mobile_number", mobile_number)
    .toParam()
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.render('registration')
  });
});

router.post('/twit', (req, res, next) => {
  // Constuct and run a simple query
  const user_id=req.body.user_id;
  const tweet=req.body.tweet;

  console.log(username, "----->>>>>")
  const query = DB.builder()
    .insert()
      .into("twit")
      .set("user_id", user_id)
      .set("tweet", tweet)
      .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.render('home',{res:results.rows[0]})
  });
});

module.exports = router;
