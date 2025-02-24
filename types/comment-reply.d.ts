import { CommentReply, CommentReplyLike, CommentReplyVote } from "@prisma/client"

export type ExtendedCommentReply = CommentReply & { 
    
    author : User, 
    likes : CommentReplyLike[]
  
    

    


}