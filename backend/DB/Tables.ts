import { Client } from "pg";

const client = new Client({
    connectionString:"postgresql://neondb_owner:npg_hL5qmYZjH7Px@ep-floral-truth-avgs4rju-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

async function createUserTable(){
   await client.connect().then(()=>{
        console.log("postgres connection created")
    })

    const query = `
     CREATE users TABLE(
      id SERIAL PRIMARY KEY,
      cf_Username VARCHAR(200) UNIQUE NOT NULL,
      password TEXT NOT NULL
     )
    `

    const result = await client.query(query);
    console.log(result)
    return result;

}

async function valuableInfoTable(){
    await client.connect().then(()=>{
        console.log("info-table created")
    })

    const query = `
    CREATE valuableInfo TABLE(
     id SERIAL PRIMARY KEY,
     cf_username VARCHAR(200) UNQUE NOT NULL,
     problem-links VARCHAR(200),
     FOREIGN KEY(cf_username) REFERENCE FROM users(cf_Username) ON DELETE CASCADE
    )
    `

    const result = await client.query(query)
}

async function profileInfo(){
    await client.connect().then(()=>{
          console.log("db connection established for userinfo")
    })

    const result = await client.query(`
        CREATE profileInfo TABLE(
        cf_username VARCHAR(200)
        id SERIAL PRIMARY KEY,
        contestgiven INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        ratingTag varchar(100) NOT NULL,
        questionSolves INTEGER NOT NULL
        FOREIGN KEY(cf_username) REFERENCE FROM valuableInfo(cf_username)
        )
        
        `)

        console.log(result)

        return result
}