"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema,ForgetPasswordPayload } from "@/schema/ForgotPassword";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";


const ForgetPasswordPage = () => {
    const router = useRouter()
    const form = useForm<ForgetPasswordPayload>({ 
        resolver : zodResolver(ForgotPasswordSchema), 
        defaultValues : { 
            otp : "" , 
            email : ""
        }
    })
    return ( <div className="fixed top-0 left-0 flex justify-center items-center h-full w-full z-[-1]">
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>Please enter your email address</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form>
            <FormField
                control={form.control}
                name ="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Email address
                        </FormLabel>
                        <FormControl>
                            <Input {...field} type="email" placeholder="jsmith@gmail.com" />
                        </FormControl>
                       
                        
                        

                        <FormMessage />
                    </FormItem>
                    
                )}
            />

            </form>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => router.push("/")}><ChevronLeft/>Back to home page</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </div> );
}
 
export default ForgetPasswordPage;