"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const idea_1 = __importDefault(require("./routes/idea"));
const limiter_1 = __importDefault(require("./middleware/limiter"));
const cors_1 = __importDefault(require("cors"));
const express_favicon_1 = __importDefault(require("express-favicon"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, express_favicon_1.default)(__dirname + '/assets/favicon.png'));
// Secure http headers
app.use((0, helmet_1.default)());
// Middleware that processes the request data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(limiter_1.default);
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json('Hello heroku');
});
// API routes
app.use('/api/idea', idea_1.default);
// start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
