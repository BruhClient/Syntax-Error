"use client"


import { deleteCommentReply } from "@/app/actions/delete-comment-reply"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
  
  export function DeleteCommentReplyButton({id,refetch} : {id: string , refetch : () => void}) {
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    const router = useRouter()
    const [open,setOpen] = useState(false)
    function deleteSelectedIssue(e : any) { 
        e.preventDefault()
        startTransition(() => { 
            deleteCommentReply(id).then((data) => { 
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
                    setOpen(false)
                    refetch()
                    router.refresh()
                    
                }
            })
        })
    }
    return (
      <AlertDialog open={open} >
        <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"} onClick={() => setOpen(true)} ><Trash size={"sm"} /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              reply and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending} onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => deleteSelectedIssue(e)} disabled={isPending}>{isPending ? "Loading...": "Continue" }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  