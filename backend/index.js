require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

//middleware
app.use(cors());
app.use(express.json()); 

//static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main(){
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(3000,() =>{
    console.log("listening on port 3000");
    });
}catch(error){  
    console.log("failed to connect to database");
}
}
main();