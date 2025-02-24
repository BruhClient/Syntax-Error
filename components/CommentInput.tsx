"use client"

import dynamic from "next/dynamic";
import { FunctionComponent, useRef, useState, useTransition } from "react";
import EditorJS from "@editorjs/editorjs";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { createComment } from "@/app/actions/create-comment";
import { useRouter } from "next/navigation";


const Editor = dynamic(() => import("./Editor"), {
    ssr: false,
  });



interface CommentInputProps {
    issueId : string
}
 
const CommentInput: FunctionComponent<CommentInputProps> = ({issueId}) => {
    const ref = useRef<EditorJS>(null)
    const [content,setContent] = useState<any>(null)
    const {toast} = useToast()

    const [isPending,startTransition] = useTransition()

    const router = useRouter()
    function postComment () {
        if (!content || content?.blocks.length === 0) { 
            toast({ 
                variant:"destructive", 
                title : "Comment box empty" , 
                description :"Please try again"

            })
        } else { 
            startTransition(() => {
                createComment(content,issueId).then((data) => { 
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
                    setContent(null)
                    ref.current?.clear()
                    router.refresh()
                    
                } )
            })
        }
     }
    return (<div className="flex flex-col gap-3">
            <div className="border-2 border-input w-full overflow-auto rounded-lg p-3">
                <Editor
                            editorRef={ref}
                            data={content}               
                            onChange={(e : any) => setContent(e)}
                            holder="editor_comment"
                            placeholder="Enter your comment"
                                                            
                />
                
            </div>
            <Button onClick={() => postComment()} variant={"outline"} disabled={isPending}>{isPending ? "Loading..." : "Submit"}</Button>
            

        
    </div> );
}
 
export default CommentInput;