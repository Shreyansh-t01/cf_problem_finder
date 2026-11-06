import dotenv from 'dotenv';
dotenv.config();


  const GEMINI_KEY = process.env.GEMINIAPI_KEY!;
 const DATABASE_URI =process.env.DATABASE_URL!; 
 const CORS_ORIGIN = process.env.CORS_ORIGIN!;
 const MONGO_URI = process.env.MONGO_URI;

export {GEMINI_KEY,DATABASE_URI,CORS_ORIGIN,MONGO_URI};