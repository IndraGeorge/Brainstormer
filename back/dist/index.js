"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const port = 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// htttp request
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});
// Middleware that processes the request data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes API
app.use('/api/idea', require('./routes/idea'));
// start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
