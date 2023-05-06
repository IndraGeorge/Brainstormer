"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
// Middleware that processes the request data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes API
app.use('/', require('./routes/user'));
// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
