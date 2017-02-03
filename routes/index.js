const express = require('express');
const DB = require('../helpers/db');

const router = express.Router();

const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.resolve(__dirname, '../public/images/') });
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

router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', upload.single('file'), (req, res, next) => {
  // Constuct and run a simple query
  const username = req.sanitize('username').trim();
  const password = req.sanitize('password').trim();
  const email = req.sanitize('email').trim();

  let photo = '';
  if (req.file) {
    photo = req.file.filename;
  } else {
    photo = 'sun.jpg';
  }
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password have min 2 and max 8 character').len(2, 8);
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  // req.checkBody('photo', 'Image is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    console.log('FAILED');
    res.render('registration', {
      errors,
    });
    console.log(errors);
  } else {
    const query = DB.builder()
      .insert()
      .into('registration')
      .set('username', username)
      .set('password', password)
      .set('email', email)
      .set('image', photo)
      .toParam();
    DB.executeQuery(query, (err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/login');
    });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  const errors = req.validationErrors();

  if (errors) {
    console.log('FAILED');
    res.render('login', {
      errors,
    });
    console.log(errors);
  } else {
    const query = DB.builder()
      .select()
      .field('email')
      .field('id')
      .from('registration')
      .where('email = ? AND password = ?', email, password)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      if (results.rowCount) {
        const session = req.session;
        session.mail = email;
         // console.log(results.rows);
        session.user_id = results.rows[0].id;
        res.redirect('/home');
      } else {
        console.log('>>>>> not found');
        res.redirect('/login');
      }
    });
  }
});

router.get('/home', (req, res, next) => {
  let query;
  const session = req.session;
  if (session.mail) {
    query = DB.builder()
      .select()
      .field('username')
      .field('tweet_text')
      .field('time')
      .from('registration', 'r')
      .join(DB.builder().select().from('twit'), 'u', 'r.id = u.user_id ')
      .where('u.user_id IN ? OR u.user_id = ?',
      (DB.builder().select().field('follower_id').from('follow')
        .where('login_user= ?', req.session.user_id)), req.session.user_id)
      .order('time', false)
      .toParam();
    DB.executeQuery(query, (error, twits) => {
      if (error) {
        next(error);
        return;
      }
      query = DB.builder()
      .select()
      .from('registration')
      .where('id != ?', session.user_id)
      .where('id NOT IN ?',
      DB.builder()
      .select()
      .field('follower_id')
      .from('follow')
      .where('login_user = ?', session.user_id))
      .toParam();
      DB.executeQuery(query, (err, follows) => {
        if (err) {
          next(err);
          return;
        }

        query = DB.builder()
          .select()
          .field('username')
          .field('image')
          .from('registration', 'r')
          .where('id = ?', req.session.user_id)
          .toParam();
        console.log(query);
        DB.executeQuery(query, (errors, users) => {
          if (errors) {
            next(errors);
            return;
          }
          res.render('home', {
            twits: twits.rows,
            follows: follows.rows,
            users: users.rows,
          });
        });
      });
    });
  } else {
    res.render('login');
  }
});

router.post('/follow', (req, res, next) => {
  const session = req.session;
  const query = DB.builder()
    .insert()
    .into('follow')
    .set('login_user', session.user_id)
    .set('follower_id', req.body.follower)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home');
  });
});

router.post('/unfollow', (req, res, next) => {
  const query = DB.builder()
    .delete()
    .from('follow')
    .where('id_f = ?', req.body.follower)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/profile');
  });
});

router.get('/profile', (req, res, next) => {
  const session = req.session;
  let query;
  console.log(session.mail);
  if (session.mail) {
    query = DB.builder()
      .select()
      .from('registration')
      .where('id = ?', session.user_id)
      .toParam();
    console.log(query);
    DB.executeQuery(query, (error, users) => {
      if (error) {
        next(error);
        return;
      }

      query = DB.builder()
        .select()
        .field('email')
        .field('username')
        .field('tweet_text')
        .field('time')
        .from('registration', 'r')
        .join(DB.builder().select().from('twit'), 'u', 'u.user_id =r.id')
        .where('email = ? ', req.session.mail)
        .toParam();
      console.log(query);
      DB.executeQuery(query, (errors, twits) => {
        if (errors) {
          next(errors);
          return;
        }
        query = DB.builder()
          .select()
          .field('username')
          .field('follower_id')
          .field('id_f')
          .field('id')
          .field('image')
          .from('registration', 'r')
          .join(DB.builder()
          .select()
          .from('follow'), 'f', 'r.id= f.follower_id')
          .where('login_user = ?', session.user_id)
          .toParam();
        DB.executeQuery(query, (err, follows) => {
          if (err) {
            next(err);
            return;
          }
          res.render('profile', {
            users: users.rows,
            twits: twits.rows,
            follows: follows.rows,
          });
        });
      });
    });
  } else {
    res.render('login');
  }
});

router.get('/twit', (req, res) => {
  res.render('twit');
});

router.post('/twit', (req, res, next) => {
  const tweetText = req.body.tweetText;
  const session = req.session;
  const query = DB.builder()
    .insert()
    .into('twit')
    .set('tweet_text', tweetText)
    .set('time', 'now()')
    .set('user_id', session.user_id)
    .toParam();

  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home');
  });
});


router.get('/edit', (req, res, next) => {
  const session = req.session;
  if (session.mail) {
    const query = DB.builder()
      .select()
      .field('email')
      .field('username')
      .field('password')
      .field('image')
      .from('registration')
      .where('id = ?', session.user_id)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render('edit', { res: results.rows });
    });
  } else {
    res.render('login');
  }
});
router.get('/editprofile', (req, res, next) => {
  const session = req.session;
  if (session.mail) {
    const query = DB.builder()
      .select()
      .field('image')
      .from('registration')
      .where('id = ?', session.user_id)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render('edit', { res: results.rows });
    });
  } else {
    res.render('login');
  }
});
router.post('/editprofile', upload.single('file'), (req, res, next) => {
  let photo = '';
  if (req.file) {
    photo = req.file.filename;
  } else {
    photo = 'sun.jpg';
  }
  const query = DB.builder()
    .update()
    .table('registration')
    .set('image', photo)
    .where('id = ? ', req.session.user_id)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home');
  });
});
router.post('/edit', upload.single('file'), (req, res, next) => {
  const username = req.body.editusername;
  const password = req.body.editpassword;
  const email = req.body.editemail;
  const session = req.session;
  const query = DB.builder()
    .update()
    .table('registration')
    .set('username', username)
    .set('password', password)
    .set('email', email)
    .where('id = ?', session.user_id)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie('myCookie');
      res.redirect('/login');
    }
  });
});

module.exports = router;
