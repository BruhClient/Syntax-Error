"use client"

import { changePasswordPayload, changePasswordSchema } from "@/schema/ForgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FunctionComponent, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { changePassword } from "@/app/actions/change-password";
import { useToast } from "@/hooks/use-toast";

interface ChangePasswordFormProps {
    email : string, 
    close : Dispatch<SetStateAction<boolean>>
}
 
const ChangePasswordForm: FunctionComponent<ChangePasswordFormProps> = ({email,close}) => {

    const form = useForm<changePasswordPayload>({ 
        resolver : zodResolver(changePasswordSchema), 
        defaultValues : { 
            password : "",
            confirmPassword : ""
            
        }
    })

    const [isPending, startTransition] = useTransition()
    const {toast} = useToast()

    function onSubmit (values : changePasswordPayload) { 
        startTransition(() => { 
            changePassword(email,values.password).then((data) => { 
                if (data.error) { 
                    toast({ 
                        title : data.error, 
                        variant:"destructive"
                    })
                } else { 
                    toast({ 
                        title : data.success
                    })

                    close(false)

                }
            })
        })
    }
    return ( <Form {...form}>
        <form className="flex flex-col items-center gap-2 w-full px-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
                control={form.control}
                name ="password"
                render={({field}) => (
                    <FormItem className="w-full">
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="******" type="password"   />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}
            
            />
            <FormField
                control={form.control}
                name ="confirmPassword"
                render={({field}) => (
                    <FormItem className="w-full">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="******" type="password" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}
            
            />
            <Button className="w-full"disabled={isPending}>Change Password</Button>
        </form>
        </Form> );
}
 
export default ChangePasswordForm;