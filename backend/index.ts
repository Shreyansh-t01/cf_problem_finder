import express from 'express'
import authRouter from './Routes/authRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRouter)


app.listen(3000,function(){
    console.log("app runnning on 3000")
});