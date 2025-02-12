import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

let db: SQLite.SQLiteDatabase | null = null;

// Function to Open Database (Only for iOS & Android)
export const setupDatabase = async () => {
    if (Platform.OS === 'web') {
        console.warn("Using AsyncStorage for Web, SQLite for mobile.");
        return null; 
    }
    if (!db) {
        db = await SQLite.openDatabaseAsync('recipeDB');
        console.log("Database opened");
    }
    return db;
};

// Create Users Table
export const createTables = async () => {
    const database = await setupDatabase();
    if (!database) return; 
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
    if (Platform.OS === 'web') {
        try {
            await AsyncStorage.setItem(`user:${username}`, JSON.stringify({ username, password }));
            return true;
        } catch (error) {
            console.error("AsyncStorage Insert Error:", error);
            return false;
        }
    }

    const database = await setupDatabase();
    if (!database) return false;
    
    try {
        await database.runAsync(
            'INSERT INTO users (username, password) VALUES (?, ?);',
            username,
            password
        );
        return true;
    } catch (error) {
        console.error("SQLite Insert Error:", error);
        return false;
    }
};

// Login User
export const loginUser = async (username: string, password: string) => {
    if (Platform.OS === 'web') {
        try {
            const userData = await AsyncStorage.getItem(`user:${username}`);
            if (!userData) return false;
            const user = JSON.parse(userData);
            return user.password === password;
        } catch (error) {
            console.error("AsyncStorage Login Error:", error);
            return false;
        }
    }

    const database = await setupDatabase();
    if (!database) return false;

    try {
        const user = await database.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ?;',
            username,
            password
        );
        return user ? true : false;
    } catch (error) {
        console.error("SQLite Login Error:", error);
        return false;
    }
};

// Get All Users 
export const getUsers = async () => {
    const database = await setupDatabase();
    if (!database) return [];
    try {
        return await database.getAllAsync('SELECT id, username FROM users;') || [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};