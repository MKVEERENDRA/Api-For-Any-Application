const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from config.env
dotenv.config({ path: "./config.env" });

// Retrieve the database URL from environment variables
const DB = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    // console.log(mongoose.connection); // Access the connection object correctly
})
.catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

// Log environment variables (useful for debugging, avoid in production)
console.log(process.env);



// const testNFT =new NFT({
//     name: "Test2 NFT",
//     description: "This is a test NFT",
//     image: "https://example.com/test.jpg",
//     price: 100,
//     owner: "TestUser2"
// });
// testNFT.save().then(docNFT =>{
//     console.log("Test NFT saved successfully", docNFT);
// }).catch(err =>{
//     console.error("Failed to save Test NFT", err);
// });

// Retrieve the port from environment variables or default to 3002
const port = process.env.PORT || 3002;

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
