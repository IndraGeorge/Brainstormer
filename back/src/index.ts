import express from 'express';
import http from 'http';
import { Request, Response } from 'express';
import helmet from 'helmet';
import router from './routes/idea';
import max from './middleware/limiter';
import cors from 'cors';
import favicon from 'express-favicon';

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(favicon(__dirname + '/assets/favicon.png'));

// Secure http headers
app.use(helmet());

// Middleware that processes the request data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(max);
app.use(cors());

app.get('/', (req: Request, res: Response) => {
     res.json('Hello heroku');
});

// API routes
app.use('/api/idea', router);

// start the server
server.listen(port, () => {
     console.log(`Server running at http://localhost:${port}/`);
});
