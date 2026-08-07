export interface userCredentials{
    username:string,
    maxRating:number,
    rating:number,
    totalProblemSolved?:number,
    rank:string,
    wrongAnswers?:number,
    acceptanceRate?:number
    aiResponse?:aiResponse,
    arrayRating?:[number,number][],
    arrayTagged?:[string,number][]
}
export interface aiResponse{
  analysisOfUser:string[],
  mistakesUserMade:string[],
  adviceUser:string[]
}

export interface db{
  cfUsername:string,
  id?:number,
  loginTime:Number
  userRating:number,
  problemsSolved?:number

}

export interface ratingProblemNumber{

}

