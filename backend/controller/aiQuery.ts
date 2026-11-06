import { ai } from "./ai.js";
import {z} from 'zod'

export async function aiResposne(prompt:string,jsonFormatOfSchema:z.core.JSONSchema.BaseSchema){
    let aiQuery;
      // mongodb query first to check wether the AI response is present in the indexed cache or not 


      // if no data in the db then do a LLM call  
      
try{
 aiQuery = await ai.models.generateContent({
  model:"gemini-2.5-flash",
  contents:prompt,
  config:{
    responseMimeType:`application/json`,
    responseJsonSchema:jsonFormatOfSchema  }
  
 })

}catch(err){
  console.log("gemini request failed - "+err);

}

return aiQuery;

}