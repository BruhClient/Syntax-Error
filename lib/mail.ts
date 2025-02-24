import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_VERCEL_URL




export const sendVerificationEmail = async ( email: string , token:string ) => { 
    
    const confirmLink = `https://${domain}/auth/new-verification?token=${token}`

    await resend.emails.send({ 
        from : "mail@hurdle.world", 
        to : email , 
        subject : "Confirm your email" , 
        html : `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`
    })

    
} 

export const sendPasswordVerificationEmail = async ( email: string , code:string ) => { 
    
    
    await resend.emails.send({ 
        from : "mail@hurdle.world", 
        to : email , 
        subject : "Password Reset Code" , 
        html : `<p>Your Verification Code is ${code}</p>`
    })

    
} 
