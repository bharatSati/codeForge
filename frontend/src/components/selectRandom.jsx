import { useEffect } from "react"
import "../componentsCSS/selectRandom.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";





export default function SelectRandom(){
    let navigate = useNavigate();
    const [randomNumber , setRandomNumber] = useState([]);

    let topUsers = [
    {
      "lastName": "He",
      "country": "United States",
      "lastOnlineTimeSeconds": 1769986164,
      "city": "Cupertino",
      "rating": 3715,
      "friendOfCount": 10919,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "ecnerwala",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Andrew",
      "contribution": 0,
      "organization": "MIT",
      "rank": "legendary grandmaster",
      "maxRating": 3741,
      "registrationTimeSeconds": 1340834919,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Jiang",
      "country": "China",
      "lastOnlineTimeSeconds": 1769939870,
      "city": "Chongqing",
      "rating": 3663,
      "friendOfCount": 44163,
      "titlePhoto": "https://userpic.codeforces.org/887306/title/b450806e36caa423.jpg",
      "handle": "jiangly",
      "avatar": "https://userpic.codeforces.org/887306/avatar/c9d0a77b2f3307a5.jpg",
      "firstName": "Lingyu",
      "contribution": 0,
      "organization": "Jiangly Fan Club",
      "rank": "legendary grandmaster",
      "maxRating": 4039,
      "registrationTimeSeconds": 1547985852,
      "maxRank": "jiangly"
    },
    {
      "lastName": "Xu",
      "country": "China",
      "lastOnlineTimeSeconds": 1769937802,
      "rating": 3603,
      "friendOfCount": 4595,
      "titlePhoto": "https://userpic.codeforces.org/888350/title/62ccb718380aafd9.jpg",
      "handle": "Kevin114514",
      "avatar": "https://userpic.codeforces.org/888350/avatar/8dd2ab3eaeb7a0dd.jpg",
      "firstName": "Qiwen",
      "contribution": 0,
      "organization": "awa qwq",
      "rank": "legendary grandmaster",
      "maxRating": 3811,
      "registrationTimeSeconds": 1548078679,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Sun",
      "country": "Canada",
      "lastOnlineTimeSeconds": 1770018496,
      "rating": 3599,
      "friendOfCount": 7718,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "ksun48",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Kevin",
      "contribution": 0,
      "organization": "MIT",
      "rank": "legendary grandmaster",
      "maxRating": 3781,
      "registrationTimeSeconds": 1325801676,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Korotkevich",
      "country": "Belarus",
      "lastOnlineTimeSeconds": 1770075481,
      "city": "Gomel",
      "rating": 3531,
      "friendOfCount": 86862,
      "titlePhoto": "https://userpic.codeforces.org/422/title/50a270ed4a722867.jpg",
      "handle": "tourist",
      "avatar": "https://userpic.codeforces.org/422/avatar/2b5dbe87f0d859a2.jpg",
      "firstName": "Gennady",
      "contribution": 0,
      "organization": "ITMO University",
      "rank": "legendary grandmaster",
      "maxRating": 4009,
      "registrationTimeSeconds": 1265987288,
      "maxRank": "tourist"
    },
    {
      "lastName": "Wang",
      "country": "China",
      "lastOnlineTimeSeconds": 1770039014,
      "city": "Yantai",
      "rating": 3485,
      "friendOfCount": 722,
      "titlePhoto": "https://userpic.codeforces.org/1569515/title/738d617f226f6d18.jpg",
      "handle": "strapple",
      "avatar": "https://userpic.codeforces.org/1569515/avatar/40caebea5869f243.jpg",
      "firstName": "Maohua",
      "contribution": 0,
      "organization": "",
      "rank": "legendary grandmaster",
      "maxRating": 3485,
      "registrationTimeSeconds": 1593695991,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Kawasaki",
      "country": "Japan",
      "lastOnlineTimeSeconds": 1770044417,
      "city": "Tokyo",
      "rating": 3422,
      "friendOfCount": 5658,
      "titlePhoto": "https://userpic.codeforces.org/319962/title/a76bf9501ce85c52.jpg",
      "handle": "maroonrk",
      "avatar": "https://userpic.codeforces.org/319962/avatar/e55b2c97d0cc2561.jpg",
      "firstName": "Riku",
      "contribution": 0,
      "organization": "AtCoder",
      "rank": "legendary grandmaster",
      "maxRating": 3650,
      "registrationTimeSeconds": 1437974478,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Hosaka",
      "country": "Japan",
      "lastOnlineTimeSeconds": 1769998370,
      "city": "Tokyo",
      "rating": 3377,
      "friendOfCount": 2116,
      "titlePhoto": "https://userpic.codeforces.org/938/title/fac1a30a34818629.jpg",
      "handle": "hos.lyric",
      "avatar": "https://userpic.codeforces.org/938/avatar/f7fae4cb13866bfb.jpg",
      "firstName": "Yui",
      "contribution": 0,
      "organization": "Rabbit House",
      "rank": "legendary grandmaster",
      "maxRating": 3438,
      "registrationTimeSeconds": 1267523870,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Daniliuk",
      "country": "United Kingdom",
      "lastOnlineTimeSeconds": 1769993972,
      "city": "London",
      "rating": 3376,
      "friendOfCount": 18722,
      "titlePhoto": "https://userpic.codeforces.org/65550/title/f473a58c80b87e06.jpg",
      "handle": "Um_nik",
      "avatar": "https://userpic.codeforces.org/65550/avatar/238da5f90652e9d6.jpg",
      "firstName": "Aleksei",
      "contribution": 0,
      "organization": "Um_nik Training Center",
      "rank": "legendary grandmaster",
      "maxRating": 3663,
      "registrationTimeSeconds": 1348065816,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Radecki",
      "country": "Poland",
      "lastOnlineTimeSeconds": 1770071639,
      "city": "Warsaw",
      "rating": 3367,
      "friendOfCount": 13439,
      "titlePhoto": "https://userpic.codeforces.org/147752/title/13dfa099dea83936.jpg",
      "handle": "Radewoosh",
      "avatar": "https://userpic.codeforces.org/147752/avatar/a91526f3bd0194e8.jpg",
      "firstName": "Mateusz",
      "contribution": 0,
      "organization": "University of Warsaw",
      "rank": "legendary grandmaster",
      "maxRating": 3759,
      "registrationTimeSeconds": 1385208270,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Qiu",
      "country": "China",
      "lastOnlineTimeSeconds": 1770011328,
      "city": "Nanjing",
      "rating": 3340,
      "friendOfCount": 685,
      "titlePhoto": "https://userpic.codeforces.org/874498/title/1447aa32cde56b33.jpg",
      "handle": "qiuzx",
      "avatar": "https://userpic.codeforces.org/874498/avatar/805e106c2276dfee.jpg",
      "firstName": "Zixuan",
      "contribution": 0,
      "organization": "Jiangly Fan Club",
      "rank": "legendary grandmaster",
      "maxRating": 3418,
      "registrationTimeSeconds": 1546245337,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Tamura",
      "country": "Japan",
      "lastOnlineTimeSeconds": 1770059672,
      "city": "Osaka",
      "rating": 3339,
      "friendOfCount": 922,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "Nachia",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Yui",
      "contribution": 0,
      "organization": "The University of Osaka",
      "rank": "legendary grandmaster",
      "maxRating": 3564,
      "registrationTimeSeconds": 1580626263,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Turevskii",
      "lastOnlineTimeSeconds": 1769801410,
      "rating": 3320,
      "friendOfCount": 1244,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "turmax",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Maksim",
      "contribution": 0,
      "organization": "Saint-Petersburg SU",
      "rank": "legendary grandmaster",
      "maxRating": 3457,
      "registrationTimeSeconds": 1535301434,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "jiang",
      "country": "China",
      "lastOnlineTimeSeconds": 1770020623,
      "city": "Shanghai",
      "rating": 3303,
      "friendOfCount": 590,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "jiangbowen",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "bowen",
      "contribution": 0,
      "organization": "",
      "rank": "legendary grandmaster",
      "maxRating": 3401,
      "registrationTimeSeconds": 1635680930,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Mitrichev",
      "country": "Switzerland",
      "lastOnlineTimeSeconds": 1770051832,
      "city": "Zurich",
      "rating": 3266,
      "friendOfCount": 13369,
      "titlePhoto": "https://userpic.codeforces.org/664/title/c1ef9e749cad14a0.jpg",
      "handle": "Petr",
      "avatar": "https://userpic.codeforces.org/664/avatar/a113c1791cdcd2e1.jpg",
      "firstName": "Petr",
      "contribution": 0,
      "organization": "Google",
      "rank": "legendary grandmaster",
      "maxRating": 3597,
      "registrationTimeSeconds": 1267103024,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Gyimesi",
      "country": "Hungary",
      "lastOnlineTimeSeconds": 1769955476,
      "rating": 3261,
      "friendOfCount": 1300,
      "titlePhoto": "https://userpic.codeforces.org/424529/title/24302789ffb11c44.jpg",
      "handle": "peti1234",
      "avatar": "https://userpic.codeforces.org/424529/avatar/9e80f0cb477a329c.jpg",
      "firstName": "Péter",
      "contribution": 0,
      "organization": "ELTE",
      "rank": "legendary grandmaster",
      "maxRating": 3261,
      "registrationTimeSeconds": 1465403553,
      "maxRank": "legendary grandmaster"
    },
    {
      "country": "China",
      "lastOnlineTimeSeconds": 1769783922,
      "rating": 3257,
      "friendOfCount": 3156,
      "titlePhoto": "https://userpic.codeforces.org/2668424/title/6eebb9ff043cdab.jpg",
      "handle": "StarSilk",
      "avatar": "https://userpic.codeforces.org/2668424/avatar/76b3ed911987ab7f.jpg",
      "contribution": 0,
      "organization": "Beijing JiaoTong University",
      "rank": "legendary grandmaster",
      "maxRating": 3257,
      "registrationTimeSeconds": 1657328143,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Romashov",
      "country": "Russia",
      "lastOnlineTimeSeconds": 1769987486,
      "city": "Barnaul",
      "vkId": "259250989",
      "rating": 3254,
      "friendOfCount": 2323,
      "titlePhoto": "https://userpic.codeforces.org/1250517/title/d3b47822f3860824.jpg",
      "handle": "Ormlis",
      "avatar": "https://userpic.codeforces.org/1250517/avatar/5b32008c179f4f98.jpg",
      "firstName": "Fedor",
      "contribution": 0,
      "organization": "Higher School of Economics",
      "rank": "legendary grandmaster",
      "maxRating": 3641,
      "registrationTimeSeconds": 1568806149,
      "email": "rom.fedor@bk.ru",
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Op de Beek",
      "country": "Netherlands",
      "lastOnlineTimeSeconds": 1769987510,
      "city": "Delft",
      "rating": 3234,
      "friendOfCount": 1047,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "jeroenodb",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Jeroen",
      "contribution": 0,
      "organization": "Delft University of Technology",
      "rank": "legendary grandmaster",
      "maxRating": 3234,
      "registrationTimeSeconds": 1589797475,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Huang",
      "country": "Taiwan",
      "lastOnlineTimeSeconds": 1769998427,
      "rating": 3188,
      "friendOfCount": 1441,
      "titlePhoto": "https://userpic.codeforces.org/1165734/title/7ff8b50ec2bd38bb.jpg",
      "handle": "BurnedChicken",
      "avatar": "https://userpic.codeforces.org/1165734/avatar/a5c265d843bcd92.jpg",
      "firstName": "Chung-Chun",
      "contribution": 0,
      "organization": "National Taiwan University",
      "rank": "legendary grandmaster",
      "maxRating": 3443,
      "registrationTimeSeconds": 1558859636,
      "maxRank": "legendary grandmaster"
    },
    {
      "country": "Antarctica",
      "lastOnlineTimeSeconds": 1769727998,
      "rating": 3159,
      "friendOfCount": 110,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "Szoboszlai10",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "contribution": 0,
      "organization": "Horváth Gyula Fan Club",
      "rank": "legendary grandmaster",
      "maxRating": 3163,
      "registrationTimeSeconds": 1558819226,
      "maxRank": "legendary grandmaster"
    },
    {
      "country": "Japan",
      "lastOnlineTimeSeconds": 1770038590,
      "rating": 3154,
      "friendOfCount": 1012,
      "titlePhoto": "https://userpic.codeforces.org/1604173/title/b4e774900b0ecb73.jpg",
      "handle": "potato167",
      "avatar": "https://userpic.codeforces.org/1604173/avatar/3360cd034e89e7a2.jpg",
      "contribution": 0,
      "organization": "Institute of Science Tokyo",
      "rank": "legendary grandmaster",
      "maxRating": 3337,
      "registrationTimeSeconds": 1596987046,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Stepanov",
      "country": "Russia",
      "lastOnlineTimeSeconds": 1768368825,
      "city": "Moscow",
      "rating": 3141,
      "friendOfCount": 232,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "stepanov.aa",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Anton",
      "contribution": 0,
      "organization": "Allvik06 hate-club",
      "rank": "legendary grandmaster",
      "maxRating": 3141,
      "registrationTimeSeconds": 1570250243,
      "maxRank": "legendary grandmaster"
    },
    {
      "country": "Japan",
      "lastOnlineTimeSeconds": 1770071711,
      "rating": 3096,
      "friendOfCount": 1801,
      "titlePhoto": "https://userpic.codeforces.org/479261/title/8adb3fa6ce9e3da8.jpg",
      "handle": "kotatsugame",
      "avatar": "https://userpic.codeforces.org/479261/avatar/2b5c6d2e10c9a6ae.jpg",
      "contribution": 0,
      "organization": "Tohoku University",
      "rank": "legendary grandmaster",
      "maxRating": 3327,
      "registrationTimeSeconds": 1476511324,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Gorokhovskii",
      "country": "Russia",
      "lastOnlineTimeSeconds": 1769968581,
      "city": "Moscow",
      "rating": 3071,
      "friendOfCount": 1218,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "Maksim1744",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "firstName": "Maksim",
      "contribution": 0,
      "organization": "Higher School of Economics",
      "rank": "legendary grandmaster",
      "maxRating": 3376,
      "registrationTimeSeconds": 1523267221,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Matsushita",
      "country": "Japan",
      "lastOnlineTimeSeconds": 1770023656,
      "city": "Tokyo",
      "rating": 3068,
      "friendOfCount": 1273,
      "titlePhoto": "https://userpic.codeforces.org/735783/title/94429af56bb121c7.jpg",
      "handle": "noimi",
      "avatar": "https://userpic.codeforces.org/735783/avatar/ee7e3487bab498bd.jpg",
      "firstName": "Kentaro",
      "contribution": 0,
      "organization": "Goldman Sachs",
      "rank": "legendary grandmaster",
      "maxRating": 3353,
      "registrationTimeSeconds": 1525099283,
      "email": "kenmatsu517@gmail.com",
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Trygub",
      "country": "Ukraine",
      "lastOnlineTimeSeconds": 1770055652,
      "city": "Kyiv",
      "rating": 3056,
      "friendOfCount": 3766,
      "titlePhoto": "https://userpic.codeforces.org/670003/title/fa29e9bfd008018c.jpg",
      "handle": "antontrygubO_o",
      "avatar": "https://userpic.codeforces.org/670003/avatar/65d7ce807039a90a.jpg",
      "firstName": "Anton",
      "contribution": 0,
      "organization": "MIT",
      "rank": "legendary grandmaster",
      "maxRating": 3116,
      "registrationTimeSeconds": 1512738396,
      "maxRank": "legendary grandmaster"
    },
    {
      "country": "China",
      "lastOnlineTimeSeconds": 1769932577,
      "city": "Beijing",
      "rating": 3055,
      "friendOfCount": 608,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "handle": "EnofTaiPeople",
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "contribution": 0,
      "organization": "Peking University",
      "rank": "legendary grandmaster",
      "maxRating": 3101,
      "registrationTimeSeconds": 1628204993,
      "maxRank": "legendary grandmaster"
    },
    {
      "lastName": "Dubovik",
      "country": "Belarus",
      "lastOnlineTimeSeconds": 1770063843,
      "city": "Gomel",
      "rating": 3053,
      "friendOfCount": 1857,
      "titlePhoto": "https://userpic.codeforces.org/243830/title/7e53a8a26fbd4327.jpg",
      "handle": "244mhq",
      "avatar": "https://userpic.codeforces.org/243830/avatar/2f0673b10d431f07.jpg",
      "firstName": "Yahor",
      "contribution": 0,
      "organization": "Harbour.Space University",
      "rank": "legendary grandmaster",
      "maxRating": 3278,
      "registrationTimeSeconds": 1413382830,
      "maxRank": "legendary grandmaster"
    }
]
    

    useEffect(()=>{
        let hash = [];
        let myArr = [];
        for(let i = 0;i<topUsers.length;i++) hash.push(false);
        let j = 0;
        while(j<10){
            let num = Math.floor(Math.random()*topUsers.length);
            if(!hash[num]) myArr.push(num),hash[num] = 1,j++;}
        setRandomNumber(myArr);
    },[])








    return(
        <div className="selectRandom">
            <div className="selectRandomHeading">Select From Top Users</div>
            <div className="selectRandomCardArea">
                {randomNumber.map((e,i)=>{
                return (
                    <div key = {i} className="selectRandomCard">
                <div className="photoAreaRandom"> <img src={topUsers[e].titlePhoto || null} alt="" /> </div>
                <div className="infoAreaRandom">
                    <a className="handleRandom" href={`https://codeforces.com/profile/${topUsers[e].handle}`} target="_blank" rel="noopener noreferrer">{topUsers[e].handle.toUpperCase()}</a>
                    <div className="rankRandom">{topUsers[e].rank.toUpperCase() || null}</div>
                    <div className="buttonSelectRandom">
                        <div className="epsilonRandom" onClick={()=>{navigate(`/enterDetails?friend=${topUsers[e].handle}&flag=${true}`)}}>EPSILON</div>
                        <div className="deltaRandom" onClick={()=>{navigate(`/enterDetails?friend=${topUsers[e].handle}&flag=${false}`)}}>DELTA</div>
                    </div>
                </div>
            </div>
                 )

            })} 
            </div>
        </div>
    )

}