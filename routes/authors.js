const express = require('express');
const router = express.Router();
const db = require('../database/connection');


router.get('/', (req, res) => {
    db.query('SELECT * FROM autores', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { nombre, email, imagen } = req.body;
    const query = 'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, imagen], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Autor creado', id: result.insertId });
    });
});


router.get('/:id/posts', (req, res) => {
    const authorId = req.params.id;
    const query = 'SELECT * FROM posts WHERE autor_id = ?';
    db.query(query, [authorId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
