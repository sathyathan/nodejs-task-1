import express from "express";
import fs from 'fs';
import {format} from 'date-fns';
import path from "path";

//importing space

//declaration/initailization
const app =express();
const PORT = 4000;

//Middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
   // res.status(200).json({message:"Hi all welcome to our first node app"})
   res.status(200).send(`<span style="background-color:Aqua;color:black;font-size:100px">Welcome to our first app in nodejs</span>`)
})


app.get('/create-read',(req,res)=>{
  let today = format(new Date(),'dd-mm-yyyy-HH-mm-ss')
  //console.log(today);
  const filepath = `Timestamp/${today}.txt`
  fs.writeFileSync(filepath,`${today}`,'utf8')
  let data = fs.readFileSync(filepath,'utf8')
  res.status(200).send(data)
})

app.get("/get", (req, res) => {
  const folderPath = "TimeStamp";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("An error occured while listing the files from directory");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});
//running port
app.listen(PORT,()=>{
    console.log(`App is listening on the port ${PORT}`);
})