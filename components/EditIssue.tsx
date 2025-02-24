"use client"

import { formatTimeToNow } from "@/lib/utils";
import { CreateIssuePayload, CreateIssueSchema } from "@/schema/CreateIssueSchema";
import { ExtendedIssue } from "@/types/issue";
import { zodResolver } from "@hookform/resolvers/zod";

import { FunctionComponent, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import dynamic from "next/dynamic";
import type EditorJS from "@editorjs/editorjs";
import { Button } from "./ui/button";
import { editIssue } from "@/app/actions/edit-issue";
import { useToast } from "@/hooks/use-toast";
import PostVote from "./PostVote";
import { VoteType } from "@prisma/client";
import { DeleteIssueButton } from "./DeleteIssueButton";
import SolvedButton from "./SolvedButton";

const Editor = dynamic(() => import("./Editor"), {
    ssr: false,
  });
  
interface EditIssueProps {
    issue : ExtendedIssue,
    currentVote : VoteType | undefined , 
    initialVotes : number , 

}
 
const EditIssue: FunctionComponent<EditIssueProps> = ({issue,initialVotes,currentVote}) => {
    const ref = useRef<EditorJS>(null)

    const form = useForm<CreateIssuePayload>({
            resolver : zodResolver(CreateIssueSchema), 
            defaultValues: { 
                content : issue.content,
                title : issue.title,
            }
        })
    const {toast} = useToast()

    const [isPending,startTransition] = useTransition()
    function onSubmit(values : CreateIssuePayload) { 
            startTransition(() => { 
                editIssue(values,issue.id).then((data) => { 
                    if (data.error) { 
                        toast({ 
                            variant : "destructive", 
                            title : data.error
                        })
                    } 

                    if (data.success) { 
                        toast({ 
                            title : data.success
                        })
                    }
                })
            })
        }

    
    
    return ( <Form {...form}>

        <form  onSubmit={form.handleSubmit(onSubmit)}>
            

              <div className="flex w-full items-center gap-6 ">
                <PostVote initialVotes={initialVotes} initialVote={currentVote} issueId={issue.id}/>
                <div className="flex-1">
                        <h2>
                            <FormField
                                control={form.control}
                                name ="title"
                                render={({field}) => (
                                    <FormItem>
                                    
                                        <FormControl>
                                            <TextareaAutosize {...field} className='border-none bg-background md:text-6xl text-3xl outline-none max-h-[300px] w-full' placeholder='Title'/>
                                        </FormControl>
                                    
                                        
                                        

                                        <FormMessage />
                                    </FormItem>
                                    
                                )}
                            />
                                
                            </h2>
                            <div className="flex text-muted-foreground text-sm items-center gap-2 font-nokora">
                        
                                    {issue.isSolved ? <div className="border-2 border-green-300 text-green-300 px-3 py-1 rounded-lg">Answered</div> : <div className="border-2 border-muted-foreground px-3 py-1 rounded-lg">Unanswered</div>}
                            
                                <div>You posted this issue {formatTimeToNow(issue.createdAt)}</div>
                            </div>
                    </div>


              </div>
                
                
                        
            
         
                            <FormField
                                        control={form.control}
                                        name ="content"
                                        render={({field}) => (
                                            <FormItem className="py-3">
                                               
                                                <FormControl>
                                                    <Editor
                                                        editorRef={ref}
                                                        data={field.value}
                                                        onChange={(e : any) => field.onChange(e)}
                                                        holder="editor_create"
                                                        
                                                    />
                                                </FormControl>
                                            
                                                
                                                
            
                                                <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                    />
            <div className="flex gap-2 w-full flex-wrap">
                <Button variant={"outline"} className="flex-1" type="submit" disabled={isPending}>{isPending ? "Loading..." : "Save Changes"}</Button>
                <SolvedButton issueId={issue.id} isSolved={issue.isSolved} />
                <DeleteIssueButton id={issue.id}/>
            </div>
            
        </form>
        
    </Form> );
}
 
export default EditIssue;