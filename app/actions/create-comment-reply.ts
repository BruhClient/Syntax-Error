"use server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
 

export const createCommentReply = async (message: string,commentId : string) => { 

    try { 
        

        const session = await auth()

        if (!session) { 
            return { 
                error : "Unauthorized"
            }
        }

        await prisma.commentReply.create({
            data : { 
                authorId : session.user.id , 
                message : message , 
                commentId 

                

            }
        })

        return {
            success : `Comment Reply Created`
        }



        

    } catch { 
       
        return {
            error : "Something went wrong"
        }
    }
}