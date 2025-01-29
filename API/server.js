const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 7000;

app.use(cors());

// Connect to MongoDB
const mongo_URI = 'mongodb+srv://admin:1234@cluster0.omwkm.mongodb.net/marketplace?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongo_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB', err));

// Read JSON
app.use(express.json());

// Schema and Model for MongoDB
const product_Schema = new mongoose.Schema({
    uid: String,
    display_name: String,
    product_name: String
})

const Data = mongoose.model('Products',product_Schema);

// Route for POST request
app.post('/api/data', (req, res) => {
    const newData = new Data(req.body);
    console.log('Received request: ', req.body);

    newData.save()
        .then(() => res.status(201).send('Data saved to MongoDB'))
        .catch(err => res.status(400).send(`Error: ${err}`));
});

// Route สำหรับ GET request เพื่อดึงข้อมูลจาก MongoDB
app.get('/api/data', (req, res) => {
    Data.find()
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json({ message: 'Error: ' + err }));
  });

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
