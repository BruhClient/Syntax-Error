import z from "zod"

export const CreateIssueSchema = z.object({ 
    title : z.string().min(5,{message : "Username must be at least 5 characters"}).max(30,{message : "Username must not be above 30 characters"}),
    content : z.any()

})
export type CreateIssuePayload = z.infer<typeof CreateIssueSchema>