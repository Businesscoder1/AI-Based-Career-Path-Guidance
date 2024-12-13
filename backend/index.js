const express = require('express');
const app = express();
const database = require('./config/database');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const contactUsRoute = require("./routes/Contact");
const predict = require("./routes/prediction");
const domainRoutes = require("./routes/domain");

dotenv.config();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;

// Database connection
database.connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/prediction", predict);
// app.use("/api/v1/domain", domainRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
