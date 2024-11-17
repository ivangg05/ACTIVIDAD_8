const express = require('express');
const dotenv = require('dotenv');
const postsRoutes = require('./routes/posts');
const authorsRoutes = require('./routes/authors');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/authors', authorsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor arrancado en el puerto ${PORT}`);
});
