const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// 
const mongoUrl = "mongodb://admin:password@localhost:27017";
const client = new MongoClient(mongoUrl);

// This route catches the form submission
app.post('/add-user', async (req, res) => {
    try {
        // Connect to the database
        await client.connect();
        
        
        const db = client.db('user-account');
        const collection = db.collection('users');

        
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            createdAt: new Date()
        };

        
        await collection.insertOne(newUser);
        console.log("Inserted new user:", newUser.name);

        res.send("<h3>Success! User saved. Go check Mongo Express!</h3><a href='/'>Go Back</a>");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving to database.");
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Node app is running at http://localhost:${port}`);
});