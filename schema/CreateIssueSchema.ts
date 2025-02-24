import z from "zod"

export const CreateIssueSchema = z.object({ 
    title : z.string().min(5,{message : "Title must be at least 5 characters"}).max(80,{message : "Title must not be above 30 characters"}),
    content : z.any()

})
export type CreateIssuePayload = z.infer<typeof CreateIssueSchema>