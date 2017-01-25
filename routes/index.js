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

router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = DB.builder()
    .select()
    .field('email')
    .field('id')
    .from('registration')
    .where("email = ? AND password = ?", email, password)
    .toParam();
  DB.executeQuery(query, (error, results) => {
   if (error) {
     next(error);
     return;
   }
    if(results.rowCount) {
     console.log(">>>>> found")
     // const session = req.session;
     req.session.mail = email;
     //console.log(results.rows);
     req.session.user_id = results.rows[0].id;
     console.log(req.session.user_id);
     console.log("---->>>", req.session.mail);
     console.log(".....session created")
     res.redirect('/home');
    } else {
     console.log(">>>>> not found");
     res.redirect('/login');
   }
 });
});

router.get('/registration', (req, res, next) => {
  res.render('registration');
});
router.post('/registration', (req, res, next) => {
  console.log("hello----->>>>");
  // Constuct and run a simple query
  const username=req.body.username;
  const password=req.body.password;
  const email=req.body.email;
  // console.log(username, "----->>>>>")
  const query = DB.builder()
    .insert()
    .into("registration")
    .set("username", username)
    .set("password", password)
    .set("email", email)
    .toParam()
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    console.log(results.rows);
    res.redirect('/login')
  });
});

router.get('/home', (req, res, next) => {
  console.log("rfdgdfgdf--->>>>>>>>")
  let query;
  const session = req.session;
  console.log(session.mail);
  if(session.mail){
    query = DB.builder()
      .select()
      .field('username')
      .field('tweet_text')
      .field('time')
      .from('registration', 'r')
      .join(DB.builder().select().from('twit'), 'u' , 'u.user_id =r.id')
      .toParam();

     DB.executeQuery(query, (error, twits) => {
      if (error) {
        next(error);
        return;
      }
    query = DB.builder()
      .select()
      .from('registration' ,'r')
      .field('username')
      .field('id')
      .where('id != ?' , session.user_id)
      .toParam();
    DB.executeQuery(query, (error, follows) => {
      if (error) {
        next(error);
        return;
      }
      console.log(follows.rows);

      res.render('home' , {
        twits:twits.rows,
        follows: follows.rows,
      });
    });
  });
}
else{
  res.render('login');
}
});

router.post('/follow', (req, res, next) => {
  const session = req.session;
  const query = DB.builder()
    .insert()
    .into('follow')
    .set('user_id', session.user_id)
    .set('follower_id', req.body.follower)

    .toParam()
  DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
    res.redirect('/home');
  });
});

router.get('/profile', (req, res, next) => {
  res.render('profile');
});


router.get('/twit', (req, res, next) => {
  res.render('twit');
});

router.post('/twit', (req, res, next) => {

  const tweet_text = req.body.tweet_text;
  const session = req.session;
  console.log(session.user_id);
  const query = DB.builder()
    .insert()
    .into('twit')
    .set('tweet_text', tweet_text)
    .set('time', 'now()')
    .set('like', '12')
    .set('user_id', session.user_id)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home')
  });
});
router.get('/logout', (req, res, next) => {
 console.log("----->>>>", req.session);
 req.session.destroy(function(err) {
     if(err) {
       console.log(err);
     } else {
       console.log("destroyed ----->>>>", req.session);
       res.redirect('/login');
     }
   });
});

module.exports = router;
