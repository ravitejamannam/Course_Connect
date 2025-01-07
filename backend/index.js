require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { JWT_SECRET, MONGODB_URI } = require('./config');
const { paymentRouter } = require('./routes/payment');
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));
app.use(express.json());

// Verify JWT_SECRET is set
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set!');
    process.exit(1);
}

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/payment", paymentRouter);

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
