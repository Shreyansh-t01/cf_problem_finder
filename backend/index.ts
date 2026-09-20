import express from 'express'
import { userRouter } from './routes/userRoutes.js';
import cors from 'cors'
import { CORS_ORIGIN } from './env.js';
import {problemSetConstructor} from './routes/problemRoute.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/user',userRouter)
app.use('/problemset',problemSetConstructor)
app.get('/',function(req,res){
    res.status(200).send({
        msg:"backend is listening"
    })
    console.log("application is listenin");
})


app.listen(3000,function(){
    console.log("server running on 3000");
})