"use client"

import { Dispatch, FunctionComponent, SetStateAction, useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { SignInPayload, SignInSchema } from "@/schema/SignInSchema";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GitHubButton";
import { login } from "@/app/actions/sign-in";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { OctagonAlert } from "lucide-react";



interface SignInFormProps {
    setIsResettingPassword : Dispatch<SetStateAction<boolean>>
}
 
const SignInForm: FunctionComponent<SignInFormProps> = ({setIsResettingPassword}) => {

    const form = useForm<SignInPayload>({ 
        resolver : zodResolver(SignInSchema), 
        defaultValues : { 
            email : "", 
            password : ""
        }
    })

    const searchParams = useSearchParams()


   
    const error = searchParams.get("error")
    const router = useRouter()
    const {update} = useSession()
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    function onSubmit(values: SignInPayload) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        

        startTransition(()=> { 
            login(values).then((data) => 
                 { 
                   
                    if (data?.error) { 
                        if (data.error) { 
                            toast({ 
                                variant: 'destructive',
                                title : data?.error
                            })
                        }
                        
                    } else if (data.success) { 
                        toast({ 
                            title : data.success
                        })
                        router.back()
                        
                        update()
                        
                        

                        
                    }

                    
                
            })
        })

      }


    return ( <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name ="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Email Address
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="jsmith@gmail.com" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
            <FormField
                control={form.control}
                name ="password"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} type="password" placeholder="*****" />
                        </FormControl>
                 
                        <Button variant={"link"} className="px-0" onClick={() => { 
                            setIsResettingPassword(true)
                        }}>
                            Forget Password ?
                        </Button>
                   
                
                        
                        

                        <FormMessage />
                    </FormItem>
                    
                )}
            />

            <Button className="w-full" disabled={isPending}>{isPending ? "Loading..." : "Sign in"}</Button>

            {error && <div className="flex w-full items-center justify-center text-lg gap-2 rounded-lg p-2 border-red-400 border-2"><OctagonAlert />Email already in use</div>}

            
        </form>
        <div className="flex flex-col items-center">
            <div className="w-full flex items-center gap-3 mt-2 justify-center">
                <GoogleButton />

                <GithubButton />
                
                
            </div>
            <Button variant={"link"} className="mt-5">
                        <Link href={"/create-account"}>Don't have an account ? Sign up !</Link>
            </Button>
        </div>
       
        
       
        
    </Form> );
}
 
export default SignInForm;