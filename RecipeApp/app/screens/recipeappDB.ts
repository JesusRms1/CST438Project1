import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null; 

// Function to Open Database
export const setupDatabase = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('recipeDB'); 
        console.log("Database opened");
    }
    return db;
};

// Create Users Table
export const createTables = async () => {
    const database = await setupDatabase(); 
    await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `);
    console.log("Users table created");
};

// Insert User (Sign-Up)
export const insertUser = async (username: string, password: string) => {
    const database = await setupDatabase();
    try {
        await database.runAsync(
            'INSERT INTO users (username, password) VALUES (?, ?);',
            username,
            password
        );
        return true;
    } catch (error) {
        console.error("Error inserting user:", error);
        return false;
    }
};

// Login User
export const loginUser = async (username: string, password: string) => {
    const database = await setupDatabase();
    try {
        const user = await database.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ?;',
            username,
            password
        );
        return user ? true : false;
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
};

// Get All Users
export const getUsers = async () => {
    const database = await setupDatabase();
    try {
        return await database.getAllAsync('SELECT id, username FROM users;') || [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const getUser = async (username: string) => {
    const database = await setupDatabase();
    try {
        return await database.getAllAsync('SELECT * FROM users WHERE username = ?;',username) || [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};