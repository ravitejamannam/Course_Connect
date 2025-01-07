require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());



app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.


async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(3000, () => {
            console.log("listening on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1);
    }
}
main();
