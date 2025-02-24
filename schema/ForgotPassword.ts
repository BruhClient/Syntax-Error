import z from "zod"

export const ForgotPasswordSchema = z.object({ 
    
    email : z.string().email(), 
    otp : z.string(), 
    
    


})

export type ForgetPasswordPayload = z.infer<typeof ForgotPasswordSchema>


export const changePasswordSchema = z.object({ 
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

export type changePasswordPayload = z.infer<typeof changePasswordSchema>