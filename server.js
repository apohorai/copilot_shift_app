const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database_users');
const db_shifts = require('./database_shifts');
const dbShiftAssignment = require('./database_shift_assignment');
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

// Create Shift
app.post('/shifts', (req, res) => {
    const { shift, color, start_hour, end_hour } = req.body;
    const stmt = db_shifts.prepare("INSERT INTO shifts (shift, color, start_hour, end_hour) VALUES (?, ?, ?, ?)");
    stmt.run(shift, color, start_hour, end_hour, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
});

// Read Shifts
app.get('/shifts', (req, res) => {
    db_shifts.all("SELECT * FROM shifts", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update Shift
app.put('/shifts/:id', (req, res) => {
    const { id } = req.params;
    const { shift, color, start_hour, end_hour } = req.body;
    const stmt = db_shifts.prepare("UPDATE shifts SET shift = ?, color = ?, start_hour = ?, end_hour = ? WHERE id = ?");
    stmt.run(shift, color, start_hour, end_hour, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
    stmt.finalize();
});

// Delete Shift
app.delete('/shifts/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db_shifts.prepare("DELETE FROM shifts WHERE id = ?");
    stmt.run(id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
    stmt.finalize();
});

app.post('/shift_assignment', (req, res) => {
    const { user_id, shift_id, date } = req.body;
    const stmt = dbShiftAssignment.prepare("INSERT INTO shift_assignment (user_id, shift_id, date) VALUES (?, ?, ?)");
    stmt.run(user_id, shift_id, date, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
});

// Read Shift Assignments
app.get('/shift_assignment', (req, res) => {
    dbShiftAssignment.all("SELECT * FROM shift_assignment", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update Shift Assignment
app.put('/shift_assignment/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, shift_id, date } = req.body;
    const stmt = dbShiftAssignment.prepare("UPDATE shift_assignment SET user_id = ?, shift_id = ?, date = ? WHERE id = ?");
    stmt.run(user_id, shift_id, date, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
    stmt.finalize();
});

// Delete Shift Assignment
app.delete('/shift_assignment/:id', (req, res) => {
    const { id } = req.params;
    const stmt = dbShiftAssignment.prepare("DELETE FROM shift_assignment WHERE id = ?");
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

const path = require('path');

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'users.html'));
});

app.get('/shifts.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'shifts.html'));
});