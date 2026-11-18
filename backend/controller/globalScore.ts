import { ratingValues } from "../dataMaps/globalTagMap.js"
export const globalScore = (userRating:number,tag:string):number=>{
if(userRating<1200){
   const weight =  ratingValues[0]?.weights.get(tag);
   if(!weight) return 1;
   return weight;
}
else if(userRating>=1800){
    const weight =  ratingValues[2]?.weights.get(tag);
    if(!weight) return 1;
    return weight;
}
else{
    // now deciding in between of which two rating anchors user rating perticularly lies 
    let weight = 1;
     
    if(userRating>=1200 && userRating<1500){
      const x1 = 1200;
      
      
      const lower = ratingValues[0]?.weights.get(tag);
      const upper = ratingValues[1]?.weights.get(tag);
      
      if(!lower || !upper){
        return 1;
      }
      const y1 = lower;
      const y2 = upper;
      const x2 = 1500;
       if(y1===y2) return y1;
      // now we also know x we need to find y and return it 
      const x = userRating;
      const y = y1+((x-x1)*((x2-x1)/(y2-y1)));

      weight = y;
    }
    else if(userRating>=1500 && userRating<1800){
       const x1 = 1500;
      
      
      const lower = ratingValues[1]?.weights.get(tag);
      const upper = ratingValues[2]?.weights.get(tag);
      if(!lower || !upper){
        return 1;
      }
      const y1 = lower;
      const y2 = upper;
      const x2 = 1800;

      // now we also know x we need to find y and return it 
      const x = userRating;
      const y = y1+((x-x1)*((x2-x1)/(y2-y1)));

      weight = y;
    }

    return weight;
}
}