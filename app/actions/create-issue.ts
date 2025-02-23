"use server"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { CreateIssuePayload, CreateIssueSchema } from "@/schema/CreateIssueSchema"
import { auth } from "@/lib/auth"
 

export const createIssue = async (values : CreateIssuePayload,threads : string[]) => { 

    try { 
        const {content,title} = CreateIssueSchema.parse(values)

        const session = await auth()

        if (!session) { 
            return { 
                error : "Unauthorized"
            }
        }

        const issue = await prisma.issue.create({
            data : { 
                title , 
                content , 
                authorId : session?.user.id, 
                threads : threads

            }
        })

        return {
            success : `Issue #${issue.id} has been created`
        }



        

    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return {
                error : "Payload format invalid"
            }
        }
        return {
            error : "Something went wrong"
        }
    }
}