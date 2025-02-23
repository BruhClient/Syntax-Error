"use server"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { CreateIssuePayload, CreateIssueSchema } from "@/schema/CreateIssueSchema"
import { auth } from "@/lib/auth"
 

export const editIssue = async (values : CreateIssuePayload,issueId: string) => { 

    try { 
        const {content,title} = CreateIssueSchema.parse(values)

        const session = await auth()

        if (!session) { 
            return { 
                error : "Unauthorized"
            }
        }

        const issue = await prisma.issue.update({
            where : { 
                id : issueId
            }, 
            data : { 
                title : title, 
                content : content
            }
        })

        return {
            success : `Issue #${issue.id} has been updated`
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