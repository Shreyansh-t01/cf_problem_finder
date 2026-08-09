import express from 'express'
import { userRouter } from './routes/userRoutes.js';
import cors from 'cors'
import { CORS_ORIGIN } from './env.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:`${CORS_ORIGIN}`
}))
app.use('/user',userRouter)


app.listen(8080,function(){
    console.log("server running on 3000");
})