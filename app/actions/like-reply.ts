"use server"
import { prisma } from "@/lib/db"

import { auth } from "@/lib/auth"


 

export const likeCommentReply= async (commentReplyId : string ,like : boolean) => { 
    
    try { 
       

        const session = await auth()
        
        if (!session) { 
           
            return { 
                error : "Unauthorized"
            }
        }

        const commentReply = await prisma.commentReply.findUnique({ 
            where : { 
                id : commentReplyId
                
            }
        })

        

        if (!commentReply) { 
            return { 
                error : "Comment Reply not found"
            }
        }

        if (like) { 
            await prisma.commentReplyLike.delete({ 
                where : { 
                    authorId_commentReplyId : {
                        authorId : session.user.id, 
                        commentReplyId : commentReplyId
                    }
                }
            })
        } else { 
            const commentReplyLikeExists = await prisma.commentReplyLike.findUnique({ 
                where : { 
                    authorId : session.user.id, 
                    authorId_commentReplyId : {
                        authorId : session.user.id, 
                        commentReplyId : commentReplyId
                    }
                }
            })

            if (commentReplyLikeExists) { 
                await prisma.commentReplyLike.delete({ 
                    where : { 
                        authorId_commentReplyId : {
                            authorId : session.user.id, 
                            commentReplyId : commentReplyId
                        }
                    }
                })
            } 
            
            await prisma.commentReplyLike.create({ 
                    data : { 
                        authorId : session.user.id, 
                        commentReplyId : commentReplyId
                    }
                })
            

        }

        return {
            success : `Like Successful`
        }



        

    } catch { 
        
        return {
            error : "Something went wrong"
        }
    }
}