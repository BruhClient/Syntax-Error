import z from "zod"

export const CreateAccountSchema = z.object({ 
    username : z.string().min(5,{message : "Username must be at least 5 characters"}).max(30,{message : "Username must not be above 30 characters"}) , 
    email : z.string().email(), 
    password : z.string().min(6,{message:"Password must be at least 6 characters long"}), 
    confirmPassword : z.string(), 


}).refine((data) => { 
    if (data.password !== data.confirmPassword) { 
        
        return false 
    }
    
    return true
}, { 
    message : 'Passwords do not match' , 
    path : ["confirmPassword"]
})


export type CreateAccountPayload = z.infer<typeof CreateAccountSchema>