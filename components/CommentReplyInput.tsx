
"use client"

import { FunctionComponent, useTransition } from "react";

import { useRouter } from "next/navigation";



import { Button } from "./ui/button";
import {  MessageSquare } from "lucide-react";

import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentReplyPayload, CreateCommentReplySchema } from "@/schema/CreateCommentReplySchema";
import { useToast } from "@/hooks/use-toast";
import { createCommentReply } from "@/app/actions/create-comment-reply";


interface CommentReplyInputProps {
    id : string,
    refetch : any , 
}   
 
const CommentReplyInput: FunctionComponent<CommentReplyInputProps> = ({id,refetch}) => {
    const router = useRouter()
    const [isPending,startTransition] = useTransition()
        const form = useForm({ 
            resolver : zodResolver(CreateCommentReplySchema), 
            defaultValues : {
                message : ""
            }
        })
    const {toast} = useToast()
    function onSubmit (values : CreateCommentReplyPayload) { 
            
          
                startTransition(() => {
                    createCommentReply(values.message,id).then((data) => { 
                        if (data.success) { 
                            toast({
                                title : data.success,
                            })
                        }
    
                        if (data.error) { 
                            toast({
                                title : data.error,
                                variant:"destructive"
                            })
                        }
                        form.reset()
                        refetch()
                        router.refresh()
                        
                    } )
                })
            
        }

    
    return ( 

            <Form {...form} >
                <form className="pt-3 flex w-full gap-2 " onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name ="message"
                render={({field}) => (
                    <FormItem className="flex-1">
                        
                        <FormControl>
                            <Input {...field} className="w-full"  />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}
            />
                    <Button variant={"outline"} disabled={isPending}> {isPending ? "Loading...": <>Reply<MessageSquare /></>} </Button>
                </form>
            </Form>

     );
}
 
export default CommentReplyInput;