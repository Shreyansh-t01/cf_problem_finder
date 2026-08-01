export interface userCredentials{
    username:string,
    maxRating:number,
    rating:number,
    totalProblemSolved?:number,
    rank:string,
    wrongAnswers?:number,
    acceptanceRate?:number
    aiResponse?:string
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

