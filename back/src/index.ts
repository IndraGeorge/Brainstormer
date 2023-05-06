import express from 'express';

const port = 3000;
const app = express();

// Middleware that processes the request data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes API
app.use('/', require('./routes/user'));

// start the server
app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}/`);
});
