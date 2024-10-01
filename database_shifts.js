const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shifts.db');

db.serialize(() => {
 
  db.run(`CREATE TABLE IF NOT EXISTS shifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shift TEXT NOT NULL,
    color TEXT NOT NULL,
    start_hour TEXT NOT NULL,
    end_hour TEXT NOT NULL
  )`);
});

module.exports = db;