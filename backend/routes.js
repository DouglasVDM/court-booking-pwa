const express = require('express');
const router = express.Router();
const db = require('./db'); // Your database connection

// Get all active offerings
router.get('/offerings', async (req, res) => {
    const offerings = await db.query('SELECT * FROM Special_Offerings WHERE is_active = TRUE');
    res.json(offerings);
});

// Create a new offering
router.post('/offerings', async (req, res) => {
    const { name, description, price, start_date, end_date } = req.body;
    await db.query('INSERT INTO Special_Offerings (name, description, price, start_date, end_date, is_active) VALUES (?, ?, ?, ?, ?, TRUE)', [name, description, price, start_date, end_date]);
    res.sendStatus(201);
});

// Update an offering
router.put('/offerings/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, start_date, end_date, is_active } = req.body;
    await db.query('UPDATE Special_Offerings SET name = ?, description = ?, price = ?, start_date = ?, end_date = ?, is_active = ? WHERE offering_id = ?', [name, description, price, start_date, end_date, is_active, id]);
    res.sendStatus(200);
});

// Delete an offering
router.delete('/offerings/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM Special_Offerings WHERE offering_id = ?', [id]);
    res.sendStatus(204);
});

module.exports = router;