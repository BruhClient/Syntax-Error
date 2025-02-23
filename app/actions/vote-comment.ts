"use server"
import { prisma } from "@/lib/db"

import { auth } from "@/lib/auth"
import { VoteType } from "@prisma/client"

 

export const voteComment = async (commentId : string ,vote : VoteType) => { 
    
    try { 
       

        const session = await auth()
        
        if (!session) { 
           
            return { 
                error : "Unauthorized"
            }
        }

        const issue = await prisma.comment.findUnique({ 
            where : { 
                id : commentId
            }
        })

        if (!issue) { 
            return { 
                error : "Issue does not exist"
            }
        }
     
        const voteExists = await prisma.commentVote.findFirst({ 
            where : { 
                commentId, 
                authorId : session.user.id
            }
        })
     
        if (!voteExists && vote) { 
         
            await prisma.commentVote.create({ 
                data : { 
                    commentId , 
                    authorId : session.user.id, 
                    type : vote

                }
            })
        }

        else if (voteExists?.type === vote) { 
            await prisma.commentVote.delete({ 
                where :{  
                    authorId_commentId :{ 
                        commentId , 
                        authorId : session.user.id
                    }
                }
            })
        } else  { 
            await prisma.commentVote.update({ 
                where :{  
                    authorId_commentId :{ 
                        commentId , 
                        authorId : session.user.id
                    }
                }, 
                data :{ 
                    type : vote
                }
            })
        }
        

   
      



        

        return {
            success : `Vote Success`
        }



        

    } catch { 
        
        return {
            error : "Something went wrong"
        }
    }
}