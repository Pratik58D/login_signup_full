const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const connectDB = require("./src/config/db");
dotenv.config();

const PORT =  process.env.PORT  || 8000;
connectDB()

app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("yoour server is working");
    console.log("server is runnig")
})

const authRoute =  require("./src/routes/authRoute")
const productRoute = require("./src/routes/ProductRoute.js")

app.use("/auth",authRoute);

app.use("/product",productRoute)

app.listen(PORT,()=>{
    console.log(`server is running at : ${PORT}`)
})