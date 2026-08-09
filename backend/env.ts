import dotenv from 'dotenv';
dotenv.config();


  const GEMINI_KEY = process.env.GEMINIAPI_KEY!;
 const DATABASE_URI =process.env.DATABASE_URL!; 

export {GEMINI_KEY,DATABASE_URI};