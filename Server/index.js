const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const courtCaseRoutes = require('./Routes/CourtCasesRoutes');
const userRoutes = require('./Routes/UserRoutes');
const slotRoutes = require('./Routes/SlotRoutes');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config();


mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database!"));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// base route
app.get("/", (req, res) => {
  res.send("Welcome to JIS Server!");
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/court_cases', courtCaseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/slots', slotRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
