import express from 'express'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/',function(req,res){
    res.status(200).send({
        message:"yeah this works"
    })
})


app.listen(3000,function(){
    console.log("app runnning on 3000")
});