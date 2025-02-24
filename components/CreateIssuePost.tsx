"use client"
import { CreateIssuePayload, CreateIssueSchema } from '@/schema/CreateIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';

import { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import TextareaAutosize from 'react-textarea-autosize';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import Thread from './thread';
import { createIssue } from '@/app/actions/create-issue';
import { useToast } from '@/hooks/use-toast';
import type EditorJS from "@editorjs/editorjs";
import { useEdgeStore } from './providers/EdgestoreProvider';


const Editor = dynamic(() => import("./Editor"), {
    ssr: false,
  });
  
  
const CreateNewIssue = () => {
    const ref = useRef<EditorJS>(null);


    const form = useForm<CreateIssuePayload>({
        resolver : zodResolver(CreateIssueSchema), 
        defaultValues: { 
            content : null,
            title : "",
        }
    })
    const [threads , setThreads] = useState<string[]>([]);
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()

    const {edgestore} = useEdgeStore()
    function onSubmit(values : CreateIssuePayload) { 
        startTransition(() => { 

            
            createIssue(values,threads).then(async (data) => { 
                if (data.error ) { 
                    toast({ 
                        title : data.error , 
                        variant : "destructive"
                    })
                }
                if (data.success) { 
                    toast({ 
                        title : data.success, 

                    })
                }

                if (values.content.blocks) { 
                    for (let i=0 ; i < values.content.blocks.length ; i ++) { 
                        const block = values.content.blocks[i]

                        if (block.type === "image") {
                            const imageUrl = block.data.file.url 

                            await edgestore.publicFiles.confirmUpload( { 
                                url : imageUrl
                            })
                        }

                    }
                }
                


                setThreads([])
                form.reset()

                
                if (ref.current) { 
                    ref.current.clear()
                }
                
                

            })
        })
    }
    
    return(

        <div className='w-full flex items-center flex-col px-4 py-6 '>
            
           
                <Form {...form} >
                    <form className='max-w-[800px] flex flex-col w-full py-4' onSubmit={form.handleSubmit(onSubmit)}>
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
                        <FormField
                            control={form.control}
                            name ="content"
                            render={({field}) => (
                                <FormItem >
                                   
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

                        <div className='flex flex-wrap gap-2 p-4 items-center justify-center'>
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='Javascript' color={"#d2db51"}  textColor='black' />
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='Java' color={"#3bd4b5"}  textColor='black' />
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='Python' color={"#5a69ed"}  textColor='black' />
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='Dart' color={"#30cbf2"}  textColor='black' />
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='Typescript' color={"#3721c4"}  textColor='black' />
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='Ruby' color={"#f06569"}  textColor='black' />
                            <Thread selectedThreads={threads} dispatch={setThreads} thread='C' color={"#ed9339"}  textColor='black' />
                        </div>
                        <Button variant={"outline"} disabled={isPending}>{isPending ? "Loading...": "Create Issue"}</Button>
                      
                        
                    </form>
                </Form>
                

         
            
        </div>
          
    )
}
export default CreateNewIssue;