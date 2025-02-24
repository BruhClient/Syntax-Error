"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FunctionComponent, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ForgetPasswordPayload,ForgotPasswordSchema } from "@/schema/ForgotPassword";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast";
import { sendPasswordResetEmail } from "@/app/actions/send-password-verification";
import { verifyPasswordResetEmail } from "@/app/actions/verify-password-reset-token";
import ChangePasswordForm from "./ChangePasswordForm";

interface ResettingPasswordFormProps {
    setIsResettingPassword : Dispatch<SetStateAction<boolean>>
}
 
const ResettingPasswordForm: FunctionComponent<ResettingPasswordFormProps> = ({setIsResettingPassword}) => {

    const form = useForm<ForgetPasswordPayload>({
        resolver : zodResolver(ForgotPasswordSchema), 
        defaultValues : { 
            email : "", 
            otp : "",
        }
    })  
    const [isPending,startTransition] = useTransition(

    )
    const [isVerified,setIsVerified] = useState(false)
    const [email,setEmail] = useState<string | undefined>(undefined)

    
    const {toast} = useToast()
    function onSubmit (values : ForgetPasswordPayload) { 
   
        if (values.otp == ""){ 
            
            startTransition(() => { 
                sendPasswordResetEmail(values.email).then((data) => { 
                    if (data.error) { 
                        toast({ 
                            title : data.error, 
                            variant : "destructive"
                        })
                    } 
                    if (data.success) { 
                        toast({ 
                            title : data.success, 
                            
                        
                        })
                        setEmail(values.email)
                    }
                    
                })
            })
            
            return
        }
        if (values.otp.length < 6) { 
         
            toast({ 
                title : "Please enter your comple 6 digit code" , 
                variant : "destructive"
            })
            return
        }
        else { 
            startTransition(() => { 
                verifyPasswordResetEmail(values.email,values.otp).then((data ) => { 
                    if (data.error) { 
                        toast({ 
                            title : data.error, 
                            variant : "destructive"
                        })
                    } 
                    if (data.success) { 
                        toast({ 
                            title : data.success, 
                            
                        
                        })

                        setIsVerified(true)
                        
                    }
                    
                })
            })
            
        }
    }
    return ( <div className="flex flex-col gap-3 items-center w-full ">

        {isVerified? <ChangePasswordForm email={email!} close={setIsResettingPassword}/> : 
            <Form {...form}>
            <form className="flex flex-col items-center gap-2 w-full px-3" onSubmit={form.handleSubmit(onSubmit)}>
            {!email ? <FormField
                control={form.control}
                name ="email"
                render={({field}) => (
                    <FormItem className="w-full">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="jsmith@gmail.com" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}
            
            /> : 
            <FormField
            control={form.control}
            name ="otp"
            render={({field}) => (
                <FormItem >
                    <FormLabel>Please enter your 6 digit code</FormLabel>
                    <FormControl >
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(e) => field.onChange(e)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    </FormControl>

                    <FormMessage />
                </FormItem>
                
            )}
        
            />


            }
           
            <Button type="submit" className="w-full" disabled={isPending}>{email  ? "Recover Password" : "Send OTP"}</Button>
            </form>
        </Form>
        }
        
        <Button variant={"link"} onClick={() => setIsResettingPassword(false)}>Back to sign up</Button>
    </div> );
}
 
export default ResettingPasswordForm;