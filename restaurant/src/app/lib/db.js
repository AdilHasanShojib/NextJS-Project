const { MONGO_USERNAME, password } = process.env;

// Ensure that username and password are loaded correctly
//console.log("Username:", MONGO_USERNAME);  // For debugging purposes
//console.log("Password:", password);  // For debugging purposes

export const connectionStr = `mongodb+srv://${MONGO_USERNAME}:${password}@cluster0.s1o9f.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`;
