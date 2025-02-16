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

    // delete after running this just changes previouse usernames to lowercase for case sensetivity once you run delete.
    try{
        await database.execAsync(`UPDATE users SET username = LOWER(username);`);
        console.log("Username name on table are now converted to Lowercase")
    }
    catch (error) {
        console.error("Error converting usernames to lowercase:", error);
    }
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
        const lUsername = username.toLowerCase();
        await database.runAsync(
            'INSERT INTO users (username, password) VALUES (?, ?);',
            lUsername,
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
        // to handle case sensitive
        const lUsername = username.toLowerCase();
        const user = await database.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ?;',
            lUsername,
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

// insert recipe to user?
export const addRecipe = async(userId:number,recipeId:number) =>{
    const database =await setupDatabase();
    
    try{
        await database.runAsync(
            'INSERT INTO  recipes (user_id,recipe_id) VALUES (?,?)',
            [userId,recipeId]
        );
        console.log(`Recipe ${recipeId} added for user ${userId} inside addRecipe`);

    }catch(error){
        console.error("Error while adding recipe: ",error);
        return false;
    }

};

//get recpies tied to user
export const getRecipes = async(userId:number)=>{
    const database = await setupDatabase();
    try{
        return await database.getAllAsync(`SELECT * FROM recipes WHERE user_id = ?;`,userId) || [];
    }catch (error){
        console.error("Error getting user's recipes:", error);
        return[];
    }
};
export const deleteAllRecipes = async (userId: number): Promise<boolean> => {
  try {
    const database = await setupDatabase();
    console.log('Deleting recipes for user ID:', userId);

    await database.getAllAsync(`DELETE FROM recipes WHERE user_id = ?;`, [userId]);

    console.log('Recipes deleted successfully.');
    return true;
  } catch (error) {
    console.error("Error deleting user's recipes:", error);
    return false;
  }
};

export const deleteAccount = async (userId: number): Promise<boolean> => {
  try {
    const database = await setupDatabase();
    console.log('Deleting everything for user ID:', userId);

    await database.getAllAsync(`DELETE FROM recipes WHERE user_id = ?;`, [userId]);
    await database.getAllAsync(`DELETE FROM users WHERE id = ?;`, [userId]);


    console.log('User deleted successfully.');
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
export const getRecipeCount = async (userId: number) => {
    const database = await setupDatabase();
    try {
        const result = await database.getFirstAsync(
            'SELECT COUNT(*) as count FROM recipes WHERE user_id = ?;',
            [userId]
        );
        return result?.count ?? 0;
    } catch (error) {
        console.error("Error fetching recipe count:", error);
        return 0;
    }
};
