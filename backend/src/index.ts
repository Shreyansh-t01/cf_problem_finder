import express from 'express'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
  
})


app.listen(3000,function(){
    console.log("server running");
})