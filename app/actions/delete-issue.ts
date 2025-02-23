"use server"

import { prisma } from "@/lib/db"

 

export const deleteIssue = async (issueId : string) => { 

    try { 
        
        await prisma.issue.delete({ 
            where : { 
                id : issueId
            }
        })

        return { 
            success : "Issue has been deleted "
        }


        

    } catch { 
        
        return {
            error : "Something went wrong"
        }
    }
}