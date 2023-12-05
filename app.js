const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle SignIn form submission
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Check credentials in the MySQL database
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send('Welcome ' + username + '!');
    } else {
      res.send('Invalid credentials. Please try again.');
    }
  });
});

// Handle SignUp form submission
app.post('/signup', (req, res) => {
  const { email, username, password, 'psw-repeat': passwordRepeat } = req.body;

  // Check if passwords match
  if (password !== passwordRepeat) {
    return res.send('Passwords do not match. Please try again.');
  }

  // Insert new entry for credentials in the MySQL database
  const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
  db.query(sql, [email, username, password], (err, results) => {
    if (err) throw err;

    console.log('User registered:', results);
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
