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

  // Create Recipe Table
  export const recipeTable = async() => {
    const database = await setupDatabase();
    await database.execAsync(`
         PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            recipe_id INTEGER NOT NULL
        );
    `);
    console.log("Recipes table created");
  }
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

export const updateUserInfo = async (id: number, newUsername?: string, newPassword?: string) => {
    const database = await setupDatabase();
    try {
        if (newUsername && newPassword) {

            await database.runAsync(
                'UPDATE users SET username = ?, password = ? WHERE id = ?;',
                newUsername,
                newPassword,
                id
            );
        } else if (newUsername) {

            await database.runAsync(
                'UPDATE users SET username = ? WHERE id = ?;',
                newUsername,
                id
            );
        } else if (newPassword) {

            await database.runAsync(
                'UPDATE users SET password = ? WHERE id = ?;',
                newPassword,
                id
            );
        }
        return true;
    } catch (error) {
        console.error("Error updating user info:", error);
        return false;
    }
};
