import z from "zod"

export const CreateCommentReplySchema = z.object({ 
    message : z.string().min(1,{message : "Please enter a reply"}).max(50,{message : "Reply must not exceed 50 characters"}),
  

})
export type CreateCommentReplyPayload = z.infer<typeof CreateCommentReplySchema>