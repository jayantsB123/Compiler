require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require("./routes/app.router.js");
const connectDB = require("./db/app.connect.js");


app.use(express.json());
app.use(cors());
app.use("/api/v1",mainRouter);

const PORT = process.env.PORT || 5001;
app.get("/",(req,res)=>{
    res.send("hello world");
})
const start = async () => {
    try {        
        await connectDB(process.env.MONGO_URI);
        console.log("Database Connected Successfully")
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();