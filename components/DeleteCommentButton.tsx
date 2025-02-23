"use client"

import { deleteComment } from "@/app/actions/delete-comment"
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
  
  export function DeleteCommentButton({id} : {id: string}) {
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    const [open,setOpen] = useState(false) 
    const router = useRouter()
    function deleteSelectedIssue(e : any) { 
        e.preventDefault()
        startTransition(() => { 
            deleteComment(id).then((data) => { 
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
                  
                    router.refresh()
                }
            })
        })
    }
    return (
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
        <Button variant={"destructive"} onClick={() => setOpen(true)} ><Trash />Delete Comment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment and remove your data from our servers.
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
  