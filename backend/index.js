 
 const dotenv = require("dotenv");
 dotenv.config();
 const express = require("express");
 const app = express();
 const cors = require("cors");
 const ratedQuestions = require("./routes/ratedQuestions");
 const topicWiseCF = require("./routes/topicWiseCF");
 const topicWiseLC = require("./routes/topicWiseLC");
 const port = process.env.PORT


app.use(cors());
 app.use('/ratedQuestions',ratedQuestions);
 app.use('/topicWiseCF',topicWiseCF);

 app.get("/hello",(req,res)=>{
    res.send("hello");
 })

 app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
 });

