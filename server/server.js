if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const app = express();
  const port = 3001;
  const cors = require('cors');
  const pool = require('./SqlConfig.js');
 
  const bcrypt = require('bcryptjs');
  const passport = require('passport');
  const flash = require('express-flash');
  const session = require('express-session');
  const methodOverride = require('method-override');

  app.use(cors());  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(flash());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride('_method'));


// Import userAuth and passportConfig
const { getUserByEmail, getUserById, createUser } = require('./userAuth');
const initialize = require('./passportConfig');

initialize(passport, getUserByEmail, getUserById);


//Register route
app.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);

      await createUser(req.body.username, req.body.email, hashedPassword);

      console.log('User registered:', req.body.email);

      res.status(201).send({ message: 'User registered successfully.' });

    } catch (error) {
      console.error(error);
    }
  });
  
  //Login route
  app.post('/login', checkNotAuthenticated, async (req, res, next) => {
    try {
      passport.authenticate('local', async (err, user, info) => {
        if (err) throw err;
        
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
  
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json({ message: 'Login successful' });
        });
  
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  });
  
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.json({ name: req.body.email });
  });
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  }
  
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  
// Get all blog posts
app.get('/posts', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM BlogPost');
   // console.log('Database result:', result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});


  // create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  
  // Store the blog post data in the database
  pool.query(
    'INSERT INTO BlogPost (title, content) VALUES (?, ?)',[title, content],
    (error, results) => {
      if (error) {
        console.log(error);
      } else{
        console.log(res.status(200).json({ message: 'Blog post created successfully' }));
         
      }
    }
  );
});


// Update a blog post
app.put('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const {title} = req.body;
  const { content } = req.body;

  try {
    const [result] = await pool.query("UPDATE BlogPost SET title = ?, content = ? WHERE id = ?", [title, content, id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.log(error);
  }
});




// Delete a blog post
app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
try {
    const [result] = await pool.query("DELETE FROM BlogPost WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      res.status(200).json({ message: 'Post deleted successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

  app.listen(port, () => console.log(`Example app Listening on port ${port}!`));
  