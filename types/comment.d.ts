import { CommentVote,User,Comment } from "@prisma/client"

export type ExtendedComment = Comment & { 
    _count : { 
        replies : number
    }, 
    author : User, 
    votes : CommentVote[], 
    content : Json, 
    createdAt : Date
    

    


}