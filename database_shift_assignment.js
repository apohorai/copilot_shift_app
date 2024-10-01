const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shift_assignment.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS shift_assignment (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	shift_id INTEGER NOT NULL,
	date TEXT NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(shift_id) REFERENCES shifts(id)
  )`);
});

module.exports = db;