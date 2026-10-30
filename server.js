const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Expense Tracker API Running...");
});

// Expense Routes
app.use("/api/expenses", expenseRoutes);

// Error Handler (always last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});