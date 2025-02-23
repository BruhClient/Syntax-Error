import { SignInSchema } from "@/schema/SignInSchema"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { getUserByEmail } from "./users"
import bcryptjs from "bcryptjs"
import { NextAuthConfig } from "next-auth"

export default { 
    providers : [ 
        Credentials({
            async authorize(credentials) { 
                
              
                const validatedFields = SignInSchema.safeParse(credentials)
                
                if (validatedFields.success) { 
                    const {email,password} = validatedFields.data
                    const user = await getUserByEmail(email) 
                    if (!user || !user.hashedPassword ) return null
                    const passwordMatch = await bcryptjs.compare(password , user.hashedPassword)
                    if (passwordMatch ) return user 
    
                    
    
    
                }
                return null
            }
        }), 
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID, 
            clientSecret : process.env.GOOGLE_CLIENT_SECRET, 
        }),
        GithubProvider({
            clientId : process.env.GITHUB_CLIENT_ID, 
            clientSecret : process.env.GITHUB_CLIENT_SECRET, 
        })
    ]
} satisfies NextAuthConfig