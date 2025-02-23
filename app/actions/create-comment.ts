"use server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
 

export const createComment = async (content: any,issueId : string) => { 

    try { 
        

        const session = await auth()

        if (!session) { 
            return { 
                error : "Unauthorized"
            }
        }

        await prisma.comment.create({
            data : { 
                authorId : session.user.id , 
                content : content , 
                issueId 

                

            }
        })

        return {
            success : `Comment Created`
        }



        

    } catch { 
       
        return {
            error : "Something went wrong"
        }
    }
}