import { z } from "zod";

export const EditProfileSchema = z.object({ 
    username : z.string().min(5,{message : "Username must be at least 5 characters"}).max(30,{message : "Username must not be above 30 characters"}),
    image : z.string().nullable(),
 

})

export type EditProfilePayload = z.infer<typeof EditProfileSchema>