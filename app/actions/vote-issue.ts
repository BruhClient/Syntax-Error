"use server"
import { prisma } from "@/lib/db"

import { auth } from "@/lib/auth"
import { VoteType } from "@prisma/client"

 

export const voteIssue = async (issueId : string ,vote : VoteType) => { 
    
    try { 
       

        const session = await auth()
        
        if (!session) { 
           
            return { 
                error : "Unauthorized"
            }
        }

        const issue = await prisma.issue.findUnique({ 
            where : { 
                id : issueId
            }
        })

        if (!issue) { 
            return { 
                error : "Issue does not exist"
            }
        }
     
        const voteExists = await prisma.vote.findFirst({ 
            where : { 
                issueId, 
                authorId : session.user.id
            }
        })
     
        if (!voteExists && vote) { 
         
            await prisma.vote.create({ 
                data : { 
                    issueId , 
                    authorId : session.user.id, 
                    type : vote

                }
            })
        }

        else if (voteExists?.type === vote) { 
            await prisma.vote.delete({ 
                where :{  
                    authorId_issueId :{ 
                        issueId , 
                        authorId : session.user.id
                    }
                }
            })
        } else  { 
            await prisma.vote.update({ 
                where :{  
                    authorId_issueId :{ 
                        issueId , 
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