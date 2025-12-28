const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get('/:user/:tutor',async (req,res)=>{
    let user = req.params.user;
    let tutor = req.params.tutor;
    try{
        let response = await axios.get(`https://codeforces.com/api/user.info?handles=${user};${tutor}`);
        
    }
    catch(error){
        if(error.response) res.status(400).json({type:2 , message:error.response.data.comment});
        else res.status(400).json({type:3 , message:"server error"})
    }



})

module.exports = router