const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

//Routes
const CustomerRoute = require('./Routes/CustomerRoutes');

//Middleware
const app = express();
app.use(cors());
app.use(express.json());

//API Routes
app.use('/customer', CustomerRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
    res.send("Customer API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
