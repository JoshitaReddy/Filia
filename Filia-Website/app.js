const express=require('express');
const https=require("https");


const app=express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/main.html");
})

app.get("/form.html",function(req,res){
  res.sendFile(__dirname+"/form.html");
})

app.get("/game.html",function(req,res){
  res.sendFile(__dirname+"/game.html");
})

app.post("/result.html",function(req,res){
  var FRUITS_VEGGIES=req.body.FRUITS_VEGGIES;
  var DAILY_STRESS=req.body.DAILY_STRESS;
  var PLACES_VISITED=req.body.PLACES_VISITED;
  var CORE_CIRCLE=req.body.CORE_CIRCLE;
  var SUPPORTING_OTHERS=req.body.SUPPORTING_OT;
  var SOCIAL_NETWORK=req.body.SOCIAL_NETWORK;
  var ACHIEVEMENT=req.body.ACHIEVEMENT;
  var DONATION=req.body.DONATION;
  var BMI_RANGE=req.body.BMI_RANGE;
  var TODO_COMPLETED=req.body.TODO_COMPLET;
  var FLOW=req.body.FLOW;
  var DAILY_STEPS=req.body.DAILY_STEPS;
  var LIVE_VISION=req.body.LIVE_VISION;
  var SLEEP_HOURS=req.body.SLEEP_HOURS;
  var LOST_VACATION=req.body.LOST_VACATION;
  var DAILY_SHOUTING=req.body.DAILY_SHOUTING;
  var SUFFICIENT_INCOME=req.body.SUFFICIENT_INC;
  var PERSONAL_AWARDS=req.body.PERSONAL_AWA;
  var TIME_FOR_PASSION=req.body.TIME_FOR_PASSI;
  var WEEKLY_MEDITATION=req.body.WEEKLY_MEDITAT;
  var AGE=req.body.AGE;
  var GENDER=req.body.GENDER;
  const url_mlmodel="https://hydra-hacks.herokuapp.com//?FRUITS_VEGGIES="+FRUITS_VEGGIES+"&DAILY_STRESS="+DAILY_STRESS+"&PLACES_VISITED="+PLACES_VISITED+"&CORE_CIRCLE="+CORE_CIRCLE+"&SUPPORTING_OTHERS="+SUPPORTING_OTHERS+"&SOCIAL_NETWORK="+SOCIAL_NETWORK+"&ACHIEVEMENT="+ACHIEVEMENT+"&DONATION="+DONATION+"&BMI_RANGE="+BMI_RANGE+"&TODO_COMPLETED="+TODO_COMPLETED+"&FLOW="+FLOW+"&DAILY_STEPS="+DAILY_STEPS+"&LIVE_VISION="+LIVE_VISION+"&SLEEP_HOURS="+SLEEP_HOURS+"&LOST_VACATION="+LOST_VACATION+"&DAILY_SHOUTING="+DAILY_SHOUTING+"&SUFFICIENT_INCOME="+SUFFICIENT_INCOME+"&PERSONAL_AWARDS="+PERSONAL_AWARDS+"&TIME_FOR_PASSION="+TIME_FOR_PASSION+"&WEEKLY_MEDITATION="+WEEKLY_MEDITATION+"&AGE="+AGE+"&GENDER="+GENDER;
  https.get(url_mlmodel,function(response){
    response.on("data",function(data){
      var ModelData=JSON.parse(data);
      var value=ModelData.prediction;
      if(value>=680)
      {
        res.render("result2");
      }
      else
      {
        res.render("result1");
      }
      console.log(value);
    })
  })
})

app.get("/therapy.html",function(req,res){
  res.sendFile(__dirname+"/therapy.html");
})

app.get("/chatbot.html",function(req,res){
  res.sendFile(__dirname+"/chatbot.html");
})



app.get("/memes.html",function(req,res){
  const url_memes="https://backend-omega-seven.vercel.app/api/getjoke";
  var joke=[];
  var ans=[];
  for(var i=0;i<6;i++)
  {
    https.get(url_memes,function(response){
      response.on("data",function(data){
        var MemesData=JSON.parse(data);
         joke.push(MemesData[0].question);
         ans.push(MemesData[0].punchline);
         console.log(joke);
        console.log(ans);
        
      })
    }) 
  }

  setTimeout(function(){
    console.log(joke);
      console.log(ans);
      
        res.render("memes",{
          joke1: joke[0],
          ans1: ans[0],
          joke2: joke[1],
          ans2: ans[1],
          joke3: joke[2],
          ans3: ans[2],
          joke4: joke[3],
          ans4: ans[3],
          joke5: joke[4],
          ans5: ans[4],
          joke6: joke[5],
          ans6: ans[5],
        });

        res.send();
  },3000)
  })

  

app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is running on port 3000");
});
