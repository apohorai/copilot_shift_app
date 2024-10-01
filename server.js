const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database_users');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create User
app.post('/users', (req, res) => {
    const { username, role } = req.body;
    const stmt = db.prepare("INSERT INTO users (username, role) VALUES (?, ?)");
    stmt.run(username, role, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
});

// Read Users
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update User
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    const stmt = db.prepare("UPDATE users SET username = ?, role = ? WHERE id = ?");
    stmt.run(username, role, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
    stmt.finalize();
});

// Delete User
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run(id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
    stmt.finalize();
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

