import express from 'express'
import { userRouter } from './routes/userRoutes.js';
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:true,
    credentials:true
}))
app.use('/user',userRouter)


app.listen(3000,function(){
    console.log("server running on 3000");
})