const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    const query = `
        SELECT posts.*, autores.nombre AS autor_nombre, autores.email AS autor_email 
        FROM posts
        JOIN autores ON posts.autor_id = autores.id;
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { titulo, descripcion, fecha_creacion, categoria, autor_id } = req.body;
    const query = 'INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, fecha_creacion, categoria, autor_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Post creado', id: result.insertId });
    });
});

module.exports = router;
