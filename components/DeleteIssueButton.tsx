"use client"

import { deleteIssue } from "@/app/actions/delete-issue"
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
import { useTransition } from "react"
  
  export function DeleteIssueButton({id} : {id: string}) {
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    const router = useRouter()
    function deleteSelectedIssue(e : any) { 
        e.preventDefault()
        startTransition(() => { 
            deleteIssue(id).then((data) => { 
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
                    router.push("/")
                    router.refresh()
                }
            })
        })
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant={"destructive"} ><Trash />Delete Issue</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => deleteSelectedIssue(e)} disabled={isPending}>{isPending ? "Loading...": "Continue" }</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  