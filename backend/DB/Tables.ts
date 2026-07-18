import { Client } from "pg";

 export const client = new Client({
    connectionString:"postgresql://neondb_owner:npg_hL5qmYZjH7Px@ep-floral-truth-avgs4rju-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})


async function createTable(){
   await client.connect().then(()=>{
        console.log("postgres connection created")
    })

    try{
        const query1 = `
     CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      cf_Username VARCHAR(200) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name VARCHAR(200)
     );
    `

    const result = await client.query(query1);
    console.log(result)
   
      const query = `
    CREATE TABLE IF NOT EXISTS valuableInfo(
     id SERIAL PRIMARY KEY,
     cf_username VARCHAR(200) UNIQUE NOT NULL,
     problem_links VARCHAR(200),
     FOREIGN KEY(cf_username) REFERENCES users(cf_Username) ON DELETE CASCADE
    );
    `

    const result2 = await client.query(query)
    console.log(result2)
     
     const result1 = await client.query(`
        CREATE TABLE IF NOT EXISTS profileInfo(
        username VARCHAR(200) UNIQUE NOT NULL,
        id SERIAL PRIMARY KEY,
        contestgiven INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        ratingTag varchar(100) NOT NULL,
        questionSolves INTEGER NOT NULL,
        FOREIGN KEY(username) REFERENCES valuableInfo(cf_username)
        );
        `)
   
        console.log(result1)

       
    }catch(err){
        console.log(err)
    }
    
     
    await client.end()
    

}

createTable()
