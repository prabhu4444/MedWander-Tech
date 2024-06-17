import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'prabhu44', 
  database: 'dynamicform' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Connected to MySQL!');
});

app.use(express.json());


app.post('/api/forms', (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;
  const insertQuery = `INSERT INTO users (formType, name, countryCode, phoneNumber) VALUES (?, ?, ?, ?)`;
  connection.query(insertQuery, [formType, name, countryCode, phoneNumber], (err, results) => {
    if (err) {
      console.error('Error inserting data: ', err.stack);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send('Form data added successfully');
  });
});


app.get('/api/data', (req, res) => {
    const selectQuery = `SELECT * FROM users`;
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data: ', err.stack);
        res.status(500).send('Error fetching data');
        return;
      }
      console.log(results)
      res.status(200).json(results);
    });
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
