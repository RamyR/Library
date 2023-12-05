"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./routes/Routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express_1.default.json());
app.use("/", Routes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
exports.default = app;
