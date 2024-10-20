const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const Expense = require('./models/Expense');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../client')); 

mongoose.connect('mongodb+srv://sangeetayadav23:sangeeta0715@cluster0.2lfdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));


// API routes
app.use('/api/expenses', require('./routes/expenses'));

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

