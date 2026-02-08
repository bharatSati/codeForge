 
 const dotenv = require("dotenv");
 dotenv.config();
 const mongoose = require("mongoose");
 mongoose.connect(process.env.DB_CONNECTION)
 .then(()=>console.log("DB CONNECTED Successfully"))
 .catch((err)=>console.log(err));
 const express = require("express");
 const app = express();
 const cors = require("cors");
 const ratedQuestions = require("./routes/ratedQuestions");
 const topicWiseCF = require("./routes/topicWiseCF");
 const topicWiseLC = require("./routes/topicWiseLC");
 const port = process.env.PORT
 const rateLimiter = require("./middleware/ratelimiter")
 
app.set("trust proxy", 1);

app.use(cors({
  origin: "https://codeforge-three.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(rateLimiter)


 app.use('/ratedQuestions',ratedQuestions);
 app.use('/topicWiseCF',topicWiseCF);

app.get("/" , (req,res)=>{
  res.json({msg:"we are in v1 testing of codeforge"})
}) 


 app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
 });

