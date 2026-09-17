import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "../env.js";


export const ai = new GoogleGenAI({apiKey:GEMINI_KEY})
//  url for the problem set --> https://codeforces.com/api/problemset.problems