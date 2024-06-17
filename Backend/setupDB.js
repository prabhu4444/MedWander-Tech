// // for creating the DB

// import mysql from 'mysql';


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'prabhu44'
// });


// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ', err.stack);
//     return;
//   }
//   console.log('Connected to MySQL!');

  
//   const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS mydatabase';
//   connection.query(createDatabaseQuery, (err, results) => {
//     if (err) {
//       console.error('Error creating database: ', err.stack);
//       connection.end();
//       return;
//     }
//     console.log('Database created or already exists!');

//     // Switch to the new database
//     connection.changeUser({ database: 'mydatabase' }, (err) => {
//       if (err) {
//         console.error('Error switching to database: ', err.stack);
//         connection.end();
//         return;
//       }

      
//       const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           formType VARCHAR(10) NOT NULL,
//           name VARCHAR(100) NOT NULL,
//           countryCode VARCHAR(10) NOT NULL,
//           phoneNumber VARCHAR(20) NOT NULL,
//         );
//       `;

//       connection.query(createTableQuery, (err, results) => {
//         if (err) {
//           console.error('Error creating users table: ', err.stack);
//           connection.end();
//           return;
//         }
//         console.log('Users table created or already exists!');
//         connection.end();
//       });
//     });
//   });
// });
