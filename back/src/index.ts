import express from 'express';
import http from 'http';
import { Request, Response } from 'express';

const port = 3000;
const app = express();
const server = http.createServer(app);

// htttp request
app.use((req: Request, res: Response, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
     );
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
     next();
});

// Middleware that processes the request data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes API
app.use('/api/idea', require('./routes/idea'));

// start the server
server.listen(port, () => {
     console.log(`Server running at http://localhost:${port}/`);
});
