"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MySQL Connection
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", // Replace with your actual MySQL password
    database: "recipe_app",
});
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
        return;
    }
    console.log("Connected to MySQL database.");
});
// Register User
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], (err) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully!" });
    });
}));
// Login User
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(500).json({ error: err.message });
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }
        const user = results[0];
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Incorrect password" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
        res.json({ token, username: user.username });
    }));
});
// Get Users
app.get("/users", (req, res) => {
    db.query("SELECT id, username FROM users", (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
// Start Server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
