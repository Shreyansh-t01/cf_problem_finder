import {client} from '../DB/Tables.js'
import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface Status{
    message:string
}

export  async function registerUser(req:Request,res:Response):Promise<void>{
    const {password,username,name} = req.body
     
    if(!password || !username){
        const answer:Status = {
            message:"Please fill out all the fields"
        }
        res.status(400).send(answer)
    }
      await client.connect()

    const user = await client.query(`SELECT * FROM users TABLE
        WHERE cf_username LIKE "username;"
        `)
    if(user){

        const answer:Status = {
            message:"user already exists"
        }
         res.status(409).send(answer)
    }

   
    const salt = bcrypt.genSalt(10, function(err,salt){
        if(err){
            res.status(400).send({
                message:"password hashing failed try again"
            })
        }
        
        bcrypt.hash(password,salt, async  function(err,hash){
            if(err){
                res.status(400).send({
                message:"password hashing failed try again"
            })
            }
            let checkName:boolean = false
             if(name){ 
                checkName = true
             } 
             
            const data = [
                hash,
                username,
                checkName? name:null
            ]
            const query = `
             INSERT INTO users(password,cf_username,name) VALUES($1,$2,$3);
            `
          
           try{
             const result = await client.query(query,data);
             jwt.sign({username},"GUhsNMC3Je8z1uAhAubuNELqHKKtdkTTSPmmEDombSE")
             res.status(201).send({
                message:"user is successfully create"
            })
           }catch(err){
            console.log(err);
            res.status(400).send({
                message:"db query failed"
            })
           }

            
        })
    })

}


