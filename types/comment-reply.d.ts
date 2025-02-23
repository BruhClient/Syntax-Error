import { CommentReply, CommentReplyVote } from "@prisma/client"

export type ExtendedCommentReply = CommentReply & { 
    
    author : User, 
  
    

    


}