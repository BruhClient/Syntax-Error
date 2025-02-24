"use client"

import { useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GitHubButton";
import { CreateAccountPayload, CreateAccountSchema } from "@/schema/CreateAccountScema";
import { createAccount } from "@/app/actions/create-account";
import { useToast } from "@/hooks/use-toast";



 
const CreateAccountForm = () => {

    const form = useForm<CreateAccountPayload>({ 
        resolver : zodResolver(CreateAccountSchema), 
        defaultValues : { 
            email : "", 
            password : "", 
            confirmPassword: "" , 
            username : "", 

        }
    })

    const [isPending,startTransition ] = useTransition()
    const {toast} = useToast()
    function onSubmit(values: CreateAccountPayload) {
        
        
        startTransition(() => { 
            createAccount(values).then((data) => { 
                if (data.error) { 
                    toast({ 
                        title : data.error, 
                        variant:"destructive"
                    })
                } else { 
                    toast({ 
                        title : data.success
                    })
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
                name ="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Quandale Dingle" />
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
                       
                   

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
            <FormField
                control={form.control}
                name ="confirmPassword"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Confirm Password
                        </FormLabel>
                        <FormControl>
                            <Input {...field} type="password" placeholder="*****" />
                        </FormControl>
                       
                      
                        

                        <FormMessage />
                    </FormItem>
                    
                )}
            />

            <Button className="w-full" disabled={isPending} >{isPending ? "Loading ...":"Create Account"}</Button>

            
        </form>

        <div className="flex flex-col items-center">
            <div className="w-full flex items-center gap-3 mt-2 justify-center">
                <GoogleButton />

                <GithubButton />
                
                
            </div>
            <Button variant={"link"} className="mt-5 ">
                    <Link href={"/signin"} className="self-center">Have an account ? Sign in !</Link>
            </Button>
        </div>
        
        
       
        
    </Form> );
}
 
export default CreateAccountForm;