const express = require("express");
const router = express.Router();
const axios = require("axios");


router.get('/:user/:tutor',async (req,res)=>{
    let user = req.params.user;
    let tutor = req.params.tutor;
    let response;
    try{
        response = await axios.get(`https://codeforces.com/api/user.info?handles=${user};${tutor}`);
        }
    catch(error){  
        if(error.response) return res.status(400).json({type:2 , message:error.response.data.comment});
        return res.status(400).json({type:3 , message:"Server Error"});
    }
    let userRawData,tutorRawData;
    try{
        userRawData = await axios.get(`https://codeforces.com/api/user.status?handle=${user}&from=1&count=1000000000`);
        tutorRawData = await axios.get(`https://codeforces.com/api/user.status?handle=${tutor}&from=1&count=1000000000`);
    }
    catch(error) { return res.status(400).json({message: error.message}); }


    let userData = userRawData.data.result,tutorData = tutorRawData.data.result;
    
    // Hashing the user Questions that have been accepted to prevent already done questions
    let userHash = [];
    for(let i = 0;i<=3000;i++) userHash.push([]);
    for(let i = 0;i<userData.length;i++){
        // For rated questions backend we will skip unrated questions
        if(!userData[i].problem.rating) continue;
        if(userData[i].verdict!=='OK') continue;
        let flag = 0;
        let contest = userData[i].problem.contestId;
        let question = userData[i].problem.index;
        for(let j = 0;j<userHash[contest].length;j++){
            if(userHash[contest][j]===question){
                flag = 1;
                break;}
            } 
        if(!flag) userHash[contest].push({
            question:question,
            isTaken: 0,
        })
    };
    

    
    let userCompleted = 0,total = 0; // Here userCompleted are the total questions that are the common question between user and tutor while total quetion are total question done by use...
    // Also total does not include the questions which are attempted by tutor but yet not accepted but remember those question will appear in final list
    
    // Hashing the tutor questions that are not marked in user hash
    let tutorHash = [];
    for(let i = 0;i<=3000;i++) tutorHash.push([]);
    for(let i = 0;i<tutorData.length;i++){
        // For rated questions backend we will skip unrated questions
        if(!tutorData[i].problem.rating) continue;
        let contest = tutorData[i].problem.contestId;
        let question = tutorData[i].problem.index;
        let flag = 1;
        for(let j = 0;j<userHash[contest].length;j++){
            if(userHash[contest][j].question===question){
                if(tutorData[i].verdict==="OK" && !userHash[contest][j].isTaken){
                    userHash[contest][j].isTaken = 1;
                    userCompleted++;
                    total++;}
                flag = 0;
                break;} 
            }
        if(!flag) continue;
        for(let j = 0;j<tutorHash[contest].length;j++){
            if(tutorHash[contest][j].index===question){
                if(tutorData[i].verdict==="OK"){
                    tutorHash[contest][j].solution = tutorData[i].id
                    tutorHash[contest][j].correctAttempt++;}
                else tutorHash[contest][j].incorrectAttempt++;
                flag = 0;
                break;}
            }
        if(!flag) continue;
        tutorHash[contest].push({
            contestId: contest,
            index: question,
            question: tutorData[i].problem.name,
            rating: Number(tutorData[i].problem.rating),
            solution: (tutorData[i].verdict==="OK") ? tutorData[i].id:`${tutor} has no correct submission for this problem`,
            correctAttempt: 0,
            incorrectAttempt: 0,
        });
        (tutorData[i].verdict==="OK") ? tutorHash[contest][tutorHash[contest].length-1].correctAttempt++ : tutorHash[contest][tutorHash[contest].length-1].incorrectAttempt++;
        if(tutorHash[contest][tutorHash[contest].length-1].correctAttempt===1) total++;
    }
    

    let ratedArray = [];
    for(let i = 0;i<=40;i++) ratedArray.push([]);
    for(let i = 0;i<tutorHash.length;i++){
        for(let j = 0;j<tutorHash[i].length;j++){
            let acceptance= ((tutorHash[i][j].correctAttempt)/(tutorHash[i][j].correctAttempt+tutorHash[i][j].incorrectAttempt))*100;
            let acceptancePercentage = Math.round(acceptance*100)/100;
            ratedArray[tutorHash[i][j].rating/100].push({
                contestId: tutorHash[i][j].contestId,
                index: tutorHash[i][j].index,
                question: tutorHash[i][j].question,
                solution: tutorHash[i][j].solution,
                acceptanceRate: `${acceptancePercentage}%`
            });
        }
    }
            
    res.status(200).json({type:1,userCompleted,total,ratedArray}); 
        })



module.exports = router